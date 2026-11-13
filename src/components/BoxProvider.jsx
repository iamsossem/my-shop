import { useCallback, useMemo, useState } from 'react'
import { BoxContext } from './boxContext'
import { SLOTS_PER_CAT } from '../data/snacks'

export default function BoxProvider({ children }) {
  const [cats, setCatsState] = useState(1)
  // 칸 순서대로 담긴 간식 id 목록. 담으면 앞 칸부터 채워진다.
  const [order, setOrder] = useState([])

  const capacity = cats * SLOTS_PER_CAT

  const add = useCallback(
    (id) => setOrder((o) => (o.length < cats * SLOTS_PER_CAT ? [...o, id] : o)),
    [cats],
  )

  // − 버튼: 그 간식으로 채워진 칸 하나(가장 뒤 칸)를 비운다
  const removeOne = useCallback(
    (id) =>
      setOrder((o) => {
        const i = o.lastIndexOf(id)
        if (i < 0) return o
        const next = o.slice()
        next.splice(i, 1)
        return next
      }),
    [],
  )

  // 채워진 칸 클릭: 그 칸을 비운다
  const removeAt = useCallback((index) => setOrder((o) => o.filter((_, i) => i !== index)), [])

  // 담은 개수보다 칸이 적어지는 마리 수는 고를 수 없다 (시안 기준)
  const setCats = useCallback(
    (n) => {
      if (order.length <= n * SLOTS_PER_CAT) setCatsState(n)
    },
    [order.length],
  )

  const reset = useCallback(() => {
    setOrder([])
    setCatsState(1)
  }, [])

  const value = useMemo(
    () => ({ cats, order, capacity, full: order.length >= capacity, add, removeOne, removeAt, setCats, reset }),
    [cats, order, capacity, add, removeOne, removeAt, setCats, reset],
  )

  return <BoxContext.Provider value={value}>{children}</BoxContext.Provider>
}
