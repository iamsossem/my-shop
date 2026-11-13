import { useRef } from 'react'
import NavBar from '../components/NavBar'
import PriceSummary from '../components/PriceSummary'
import SnackShape from '../components/SnackShape'
import { LunchBoxShell } from '../components/LunchBox'
import { CoreButton, CoreLink, MoreLink, SubLink } from '../components/Buttons'
import { useBox } from '../components/boxContext'
import { SNACKS, SNACK_BY_ID } from '../data/snacks'
import { won } from '../data/pricing'
import './BoxBuilder.css'
import './Cart.css'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" />
    </svg>
  )
}

// 모션이 멈춰 있어도(탭이 가려짐 등) 정해진 시간이 지나면 다음으로 넘어간다
const played = (anim, ms) => Promise.race([anim.finished.catch(() => {}), new Promise((r) => setTimeout(r, ms + 150))])

const reduceMotion = () => document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 장바구니 박스 카드: 체크 + 작은 도시락 + 구성 + 박스 금액 + 삭제
function CartBox({ box, index, onToggle, onRemove }) {
  const ref = useRef(null)
  const removing = useRef(false)
  const counts = SNACKS.map((s) => ({ ...s, count: box.items.filter((id) => id === s.id).length })).filter((s) => s.count > 0)
  const price = box.items.reduce((sum, id) => sum + SNACK_BY_ID[id].price, 0)

  // 체크: 고르면 카드가 살짝 튀고 테두리가 한 번 퍼진다
  const handleToggle = () => {
    if (!box.selected && ref.current && !reduceMotion()) {
      ref.current.animate(
        [
          { scale: '1', boxShadow: '0 0 0 0 rgba(47, 125, 79, 0.35)' },
          { scale: '1.015', boxShadow: '0 0 0 8px rgba(47, 125, 79, 0.12)', offset: 0.35 },
          { scale: '1', boxShadow: '0 0 0 14px rgba(47, 125, 79, 0)' },
        ],
        { duration: 450, easing: 'cubic-bezier(0.3, 1.4, 0.5, 1)' },
      )
    }
    onToggle()
  }

  // 삭제: 카드가 오른쪽으로 밀리며 사라진 뒤 자리가 접히고, 아래 카드들이 올라온다
  const handleRemove = async () => {
    const el = ref.current
    if (removing.current) return
    if (!el || reduceMotion()) return onRemove()
    removing.current = true
    el.style.pointerEvents = 'none'
    await played(
      el.animate([{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: 'translateX(60px) rotate(2deg)' }], {
        duration: 260,
        easing: 'ease-in',
        fill: 'forwards',
      }),
      260,
    )
    const gap = parseFloat(getComputedStyle(el.parentElement).rowGap) || 0
    await played(
      el.animate(
        [
          { height: `${el.offsetHeight}px`, paddingTop: getComputedStyle(el).paddingTop, paddingBottom: getComputedStyle(el).paddingBottom, borderWidth: '2px', marginBottom: '0px' },
          { height: '0px', paddingTop: '0px', paddingBottom: '0px', borderWidth: '0px', marginBottom: `${-gap}px` },
        ],
        { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' },
      ),
      300,
    )
    onRemove()
  }

  return (
    <li ref={ref} className={`cart-box${box.selected ? ' cart-box--selected' : ''}`} data-reveal style={{ '--reveal-i': index }}>
      <label className="cart-check">
        <input type="checkbox" checked={box.selected} onChange={handleToggle} aria-label={`박스 ${index + 1} 신청에 포함`} />
        <span className="cart-check__box">
          <CheckIcon />
        </span>
      </label>
      <div className="cart-box__visual">
        <LunchBoxShell small>
          {box.items.map((id, i) => (
            <span key={i} className="lunchbox__slot" style={{ background: SNACK_BY_ID[id].bg }}>
              <SnackShape id={id} />
            </span>
          ))}
        </LunchBoxShell>
      </div>
      <div className="cart-box__info">
        <h2 className="cart-box__name">박스 {index + 1}</h2>
        <ul className="cart-box__items">
          {counts.map((s) => (
            <li key={s.id}>
              {s.name} <strong>×{s.count}</strong>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-box__side">
        <strong className="cart-box__price">{won(price)}</strong>
        <button type="button" className="cart-box__remove" onClick={handleRemove}>
          삭제
        </button>
      </div>
    </li>
  )
}

// P04 장바구니: 다 채운 박스를 모아 두고, 고른 박스만 정기배송 신청으로 넘긴다
export default function Cart() {
  const { cart, toggleSelected, selectAll, removeFromCart, selectedBoxes, checkoutOrder } = useBox()
  const allSelected = cart.length > 0 && selectedBoxes.length === cart.length

  return (
    <div className="page">
      <NavBar />
      <main className="container page__main">
        <div className="page__head" data-reveal>
          <span className="page__eyebrow">MY CART</span>
          <h1 className="page__title">장바구니</h1>
          <p className="page__desc">정기배송으로 받을 박스를 골라 주세요. 고른 박스만 신청돼요.</p>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty" data-reveal>
            <p>장바구니가 비어 있어요. 8칸 박스부터 만들어 볼까요?</p>
            <MoreLink to="/box">박스 만들기</MoreLink>
          </div>
        ) : (
          <div className="builder">
            <section className="cart-list" aria-label="담은 박스">
              <div className="cart-list__bar">
                <label className="cart-check cart-check--all">
                  <input type="checkbox" checked={allSelected} onChange={() => selectAll(!allSelected)} />
                  <span className="cart-check__box">
                    <CheckIcon />
                  </span>
                  전체 선택 ({selectedBoxes.length}/{cart.length})
                </label>
                <SubLink to="/box">박스 더 만들기</SubLink>
              </div>
              <ul className="cart-list__items">
                {cart.map((box, i) => (
                  <CartBox
                    key={box.id}
                    box={box}
                    index={i}
                    onToggle={() => toggleSelected(box.id)}
                    onRemove={() => removeFromCart(box.id)}
                  />
                ))}
              </ul>
            </section>

            <aside aria-label="선택한 박스 요약" className="builder__aside">
              <PriceSummary order={checkoutOrder} />
              {selectedBoxes.length > 0 ? (
                <CoreLink to="/subscribe" full>
                  선택한 박스 {selectedBoxes.length}개 정기배송 신청
                </CoreLink>
              ) : (
                <CoreButton type="button" full disabled>
                  신청할 박스를 골라 주세요
                </CoreButton>
              )}
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}
