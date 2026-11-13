import { SNACK_BY_ID } from './snacks'

// 가격 정책: 정기배송 5% 할인, 상품 합계 30,000원 이상 배송비 무료 (PROJECT_CONTEXT 3-3)
// 30,000원 미만 배송비는 [미정]
export const DISCOUNT_RATE = 0.05
export const FREE_SHIPPING_MIN = 30000

export const won = (n) => `${n.toLocaleString('ko-KR')}원`

export function getPricing(order) {
  const subtotal = order.reduce((sum, id) => sum + SNACK_BY_ID[id].price, 0)
  const discount = Math.round(subtotal * DISCOUNT_RATE)
  const free = subtotal >= FREE_SHIPPING_MIN
  return {
    subtotal,
    discount,
    free,
    total: subtotal - discount,
    subtotalText: won(subtotal),
    discountText: discount > 0 ? `−${won(discount)}` : '0원',
    shipText: subtotal === 0 ? '-' : free ? '무료' : '[미정]',
    totalText: won(subtotal - discount),
    freeHint:
      subtotal === 0
        ? '간식을 1개 이상 담아 주세요.'
        : free
          ? '무료배송 조건을 채웠어요.'
          : `무료배송까지 ${won(FREE_SHIPPING_MIN - subtotal)} 남았어요.`,
  }
}
