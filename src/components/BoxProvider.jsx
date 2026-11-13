import { useCallback, useMemo, useState } from 'react'
import { BoxContext } from './boxContext'
import { BOX_SLOTS } from '../data/snacks'

let nextCartId = 1

// 만드는 중인 박스 1개(8칸) + 장바구니(다 채운 박스 목록). 새로고침하면 초기화(저장하지 않음)
export default function BoxProvider({ children }) {
  // 만드는 중인 박스: 칸 순서대로 담긴 간식 id. 앞 칸부터 채워진다
  const [order, setOrder] = useState([])
  // 장바구니: { id, items(간식 id 8개), selected(신청할지) }
  const [cart, setCart] = useState([])

  const full = order.length >= BOX_SLOTS
  const nextSlot = full ? -1 : order.length

  const add = useCallback((id) => setOrder((o) => (o.length < BOX_SLOTS ? [...o, id] : o)), [])

  // − 버튼: 그 간식으로 채워진 칸 하나(가장 뒤 칸)를 비운다
  const removeOne = useCallback(
    (id) =>
      setOrder((o) => {
        const i = o.lastIndexOf(id)
        return i < 0 ? o : o.filter((_, j) => j !== i)
      }),
    [],
  )

  // 채워진 칸 클릭: 그 칸을 비운다
  const removeAt = useCallback((index) => setOrder((o) => o.filter((_, i) => i !== index)), [])

  // 장바구니 담기: 8칸을 다 채운 박스만. 담으면 박스는 비워져 다음 박스를 만들 수 있다
  const addToCart = useCallback(() => {
    if (order.length < BOX_SLOTS) return
    const box = { id: nextCartId++, items: order, selected: true }
    setCart((c) => [...c, box])
    setOrder([])
  }, [order])

  const removeFromCart = useCallback((id) => setCart((c) => c.filter((b) => b.id !== id)), [])
  const toggleSelected = useCallback(
    (id) => setCart((c) => c.map((b) => (b.id === id ? { ...b, selected: !b.selected } : b))),
    [],
  )
  const selectAll = useCallback((selected) => setCart((c) => c.map((b) => ({ ...b, selected }))), [])

  // 정기배송 신청 대상: 장바구니에서 고른 박스들
  const selectedBoxes = useMemo(() => cart.filter((b) => b.selected), [cart])
  const checkoutOrder = useMemo(() => selectedBoxes.flatMap((b) => b.items), [selectedBoxes])

  // 신청 완료: 신청한 박스를 장바구니에서 뺀다
  const completeCheckout = useCallback(() => setCart((c) => c.filter((b) => !b.selected)), [])

  const value = useMemo(
    () => ({
      order,
      capacity: BOX_SLOTS,
      full,
      nextSlot,
      add,
      removeOne,
      removeAt,
      cart,
      addToCart,
      removeFromCart,
      toggleSelected,
      selectAll,
      selectedBoxes,
      checkoutOrder,
      completeCheckout,
    }),
    [order, full, nextSlot, add, removeOne, removeAt, cart, addToCart, removeFromCart, toggleSelected, selectAll, selectedBoxes, checkoutOrder, completeCheckout],
  )

  return <BoxContext.Provider value={value}>{children}</BoxContext.Provider>
}
