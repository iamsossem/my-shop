import { getPricing } from '../data/pricing'
import './PriceSummary.css'

// 정기배송 방식·가격 요약: 정책 2줄 → 합계/할인/배송비 → 매달 결제 금액 → 도움말
export default function PriceSummary({ order, showHint = true }) {
  const p = getPricing(order)
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
          <dd>{p.subtotalText}</dd>
        </div>
        <div>
          <dt>정기배송 할인 (5%)</dt>
          <dd className="price-summary__discount">{p.discountText}</dd>
        </div>
        <div>
          <dt>배송비</dt>
          <dd>{p.shipText}</dd>
        </div>
      </dl>
      <div className="price-summary__total">
        <span>매달 결제 금액</span>
        <strong>{p.totalText}</strong>
      </div>
      {showHint && <p className="price-summary__hint">{p.freeHint}</p>}
    </section>
  )
}
