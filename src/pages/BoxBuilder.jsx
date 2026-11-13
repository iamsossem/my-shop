import { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import SnackCard from '../components/SnackCard'
import LunchBox from '../components/LunchBox'
import PriceSummary from '../components/PriceSummary'
import { Link } from 'react-router-dom'
import { CoreButton, SubLink } from '../components/Buttons'
import { useBox } from '../components/boxContext'
import { BOX_SLOTS, SNACKS } from '../data/snacks'
import { flyBoxToCart, flyToBox } from '../utils/flyToBox'
import './BoxBuilder.css'

// P02 박스 만들기
export default function BoxBuilder() {
  const { order, full, nextSlot, add, removeOne, cart, addToCart } = useBox()
  // 날아오는 중인 칸 번호들, 지금 강조 중인 카드
  const [pending, setPending] = useState([])
  const [focusId, setFocusId] = useState(null)
  const asideRef = useRef(null)
  const focusTimer = useRef(0)
  // 장바구니에 담은 직후 아래에 잠깐 뜨는 알림
  const [toast, setToast] = useState(0)
  const toastTimer = useRef(0)
  // 8칸 완성 연출: 마지막 칸에 간식이 닿은 순간 한 번 (비웠다 다시 채우면 또). 모든 칸이 다 닿아 있을 때만 보인다
  const [celebrate, setCelebrate] = useState(0)
  const landed = full && pending.length === 0

  useEffect(
    () => () => {
      clearTimeout(focusTimer.current)
      clearTimeout(toastTimer.current)
    },
    [],
  )

  // 장바구니 담기: 도시락이 상단 메뉴 장바구니로 날아가고, 박스는 비워져 다음 박스를 만들 수 있다
  const handleAddToCart = () => {
    if (!full) return
    const boxEl = asideRef.current?.querySelector('.lunchbox__box')
    const cartEl = document.querySelector('[data-cart-target]')
    const motion = boxEl && cartEl && !document.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // 비우기 전에 지금 모양을 복제해 날린다
    if (motion) flyBoxToCart(boxEl, cartEl).then(() => window.dispatchEvent(new Event('cart:landed')))
    else window.dispatchEvent(new Event('cart:landed'))
    addToCart()
    setPending([])
    setToast((t) => t + 1)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(0), 4000)
  }

  // +를 누르면: 바로 담고(합계도 바로 반영), 사진 꼬리가 박스의 그 칸까지 날아간 뒤 칸이 채워진다
  const handleInc = (snack, imgEl) => {
    if (full) return
    const slot = nextSlot
    add(snack.id)
    // 사진이 없거나, 모션 줄이기 설정이거나, 탭이 가려져 있으면(애니메이션이 멈춤) 바로 채운다
    if (!imgEl || document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setPending((p) => [...p, slot])
    setFocusId(snack.id)
    clearTimeout(focusTimer.current)
    focusTimer.current = setTimeout(() => setFocusId(null), 1000)

    // 칸 번호가 그려진 다음 프레임에 목적지 위치를 잰다
    requestAnimationFrame(() => {
      const target = asideRef.current?.querySelector(`[data-slot="${slot}"]`)
      const done = () => {
        setPending((p) => p.filter((i) => i !== slot))
        if (slot === BOX_SLOTS - 1) setCelebrate((c) => c + 1)
      }
      if (!target) return done()
      flyToBox(imgEl, target, snack.bg).then(done)
    })
  }

  return (
    <div className="page">
      <NavBar />
      <main className="container page__main">
        <div className="page__head" data-reveal>
          <span className="page__eyebrow">MAKE MY BOX</span>
          <h1 className="page__title">우리 냥이 입맛대로 채워 볼까요?</h1>
          <p className="page__desc">
            <strong>+</strong>를 누르면 바로 담기고, 합계도 바로 보여요. 8칸을 다 채우면 장바구니에 담아요.
          </p>
        </div>

        <div className="builder">
          {/* S04 간식 선택 영역 */}
          <section aria-label="간식 선택" className={`builder__snacks${focusId ? ' builder__snacks--focus' : ''}`}>
            {SNACKS.map((s, i) => (
              <SnackCard
                key={s.id}
                revealIndex={i % 2}
                snack={s}
                count={order.filter((id) => id === s.id).length}
                full={full}
                focus={focusId === s.id}
                onInc={(imgEl) => handleInc(s, imgEl)}
                onDec={() => removeOne(s.id)}
              />
            ))}
          </section>

          {/* 오른쪽 고정 영역: S05 내 박스 → S06 요약 → 장바구니 담기 → 장바구니로 이동 */}
          <aside
            ref={asideRef}
            aria-label="내 박스와 요약"
            className={`builder__aside${landed && celebrate ? ' builder__aside--complete' : ''}`}
          >
            <LunchBox pending={pending} celebrate={landed ? celebrate : 0} />
            <PriceSummary order={order} />
            <CoreButton type="button" full onClick={handleAddToCart} disabled={!full}>
              장바구니 담기
            </CoreButton>
            <SubLink to="/cart">장바구니로 이동{cart.length > 0 ? ` (${cart.length})` : ''}</SubLink>
          </aside>
        </div>
      </main>

      {/* 장바구니에 담았다는 알림 */}
      {toast > 0 && (
        <div key={toast} className="cart-toast" role="status">
          <span>박스를 장바구니에 담았어요. 다음 박스도 만들어 볼까요?</span>
          <Link to="/cart" viewTransition className="cart-toast__link">
            장바구니로 이동
          </Link>
        </div>
      )}
    </div>
  )
}
