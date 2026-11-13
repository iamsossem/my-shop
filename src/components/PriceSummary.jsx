import { useEffect, useRef, useState } from 'react'
import RollingText from './RollingText'
import { FREE_SHIPPING_MIN, getPricing } from '../data/pricing'
import './PriceSummary.css'

// 정기배송 방식·가격 요약: 정책 2줄 → 합계/할인/배송비 → 매달 결제 금액 → 도움말
const BURST_COLORS = ['var(--snack-tuna)', 'var(--snack-chicken)', 'var(--green-700)', 'var(--point)', 'var(--snack-pollack)']

// showHint(박스 만들기 화면)일 때는 무료배송 진행 바도 보인다
export default function PriceSummary({ order, showHint = true }) {
  const p = getPricing(order)
  const progress = Math.min(p.subtotal / FREE_SHIPPING_MIN, 1)

  // 무료배송 조건을 막 채운 순간에만 축하 효과를 한 번 터뜨린다
  const [burst, setBurst] = useState(0)
  const wasFree = useRef(p.free)
  useEffect(() => {
    if (p.free && !wasFree.current) setBurst((b) => b + 1)
    wasFree.current = p.free
  }, [p.free])
  return (
    <section className="price-summary" aria-label="정기배송 요약">
      <div className="price-summary__policy">
        <p>매달 1회 정기배송 · 신청하면 5% 할인</p>
        <p>상품 합계 30,000원 이상이면 배송비 무료</p>
      </div>
      <div className="price-summary__rule" />
      <dl className="price-summary__list">
        <div>
          <dt>상품 합계</dt>
          <dd>
            <RollingText text={p.subtotalText} />
          </dd>
        </div>
        <div>
          <dt>정기배송 할인 (5%)</dt>
          <dd className="price-summary__discount">
            <RollingText text={p.discountText} />
          </dd>
        </div>
        <div>
          <dt>배송비</dt>
          <dd>{p.shipText}</dd>
        </div>
      </dl>
      <div className="price-summary__total">
        <span>매달 결제 금액</span>
        <strong>
          <RollingText text={p.totalText} />
        </strong>
      </div>
      {showHint && (
        <div className={`free-ship${p.free ? ' free-ship--done' : ''}`}>
          <div
            className="free-ship__track"
            role="progressbar"
            aria-label="무료배송까지 진행"
            aria-valuemin={0}
            aria-valuemax={FREE_SHIPPING_MIN}
            aria-valuenow={Math.min(p.subtotal, FREE_SHIPPING_MIN)}
          >
            <div className="free-ship__fill" style={{ transform: `scaleX(${progress})` }} />
          </div>
          {burst > 0 && (
            <span key={burst} className="free-ship__burst" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <i key={i} style={{ '--a': `${i * (360 / 14)}deg`, '--c': BURST_COLORS[i % BURST_COLORS.length] }} />
              ))}
            </span>
          )}
          <p className="price-summary__hint">{p.freeHint}</p>
        </div>
      )}
    </section>
  )
}
