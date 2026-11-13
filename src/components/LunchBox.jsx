import SnackShape from './SnackShape'
import RollingText from './RollingText'
import { useBox } from './boxContext'
import { BOX_SLOTS, SNACK_BY_ID } from '../data/snacks'
import './LunchBox.css'

// 고양이 귀 모양 도시락 그림 (P02 내 박스, P04 장바구니에서 같이 씀)
export function LunchBoxShell({ children, small = false, extra = null }) {
  return (
    <div className={`lunchbox__box${small ? ' lunchbox__box--small' : ''}`}>
      {extra}
      <svg className="lunchbox__ears" viewBox="0 0 352 30" preserveAspectRatio="none" aria-hidden="true">
        <path d="M30 30 L46 4 L70 30 Z" fill="#2F7D4F" stroke="#2F7D4F" strokeWidth="6" strokeLinejoin="round" />
        <path d="M282 30 L306 4 L322 30 Z" fill="#2F7D4F" stroke="#2F7D4F" strokeWidth="6" strokeLinejoin="round" />
        <path d="M42 28 L48 14 L58 28 Z" fill="#F6B9A8" />
        <path d="M294 28 L304 14 L310 28 Z" fill="#F6B9A8" />
      </svg>
      <div className="lunchbox__body">
        <div className="lunchbox__grid">{children}</div>
      </div>
    </div>
  )
}

// P02 S05 내 박스: 도시락 1개 = 8칸, 칸 하나 = 간식 1팩. 8칸을 다 채우면 장바구니에 담을 수 있다
// pending: 간식이 아직 날아오는 중인 칸 번호. 닿을 때까지 빈 칸으로 보인다
// celebrate: 8칸을 다 채운 순간 바뀌는 번호. 바뀔 때마다 도시락이 통통 튀고 반짝이가 터진다
const SPARKLE_COLORS = ['var(--snack-tuna)', 'var(--snack-chicken)', 'var(--green-700)', 'var(--point)', 'var(--snack-pollack)']

export default function LunchBox({ pending = [], celebrate = 0 }) {
  const { order, capacity, full, removeAt } = useBox()

  return (
    <section className="lunchbox" aria-label="내 박스">
      <div className="lunchbox__head">
        <h2 className="lunchbox__title">내 박스</h2>
        <span className="lunchbox__count">
          <strong>
            <RollingText text={order.length} />
          </strong>{' '}
          / {capacity}칸
        </span>
      </div>

      <LunchBoxShell
        extra={
          celebrate > 0 && (
            <span key={celebrate} className="lunchbox__sparkles" aria-hidden="true">
              {Array.from({ length: 16 }, (_, i) => (
                <i key={i} style={{ '--a': `${i * 22.5}deg`, '--c': SPARKLE_COLORS[i % SPARKLE_COLORS.length], '--d': `${70 + (i % 3) * 26}px` }} />
              ))}
            </span>
          )
        }
      >
        {Array.from({ length: BOX_SLOTS }, (_, i) => {
          const id = order[i]
          if (!id || pending.includes(i)) {
            return (
              <span key={i} data-slot={i} role="img" aria-label="빈 칸" className="lunchbox__slot lunchbox__slot--empty">
                +
              </span>
            )
          }
          const snack = SNACK_BY_ID[id]
          const label = `${snack.name} 칸 비우기`
          return (
            <button
              key={i}
              data-slot={i}
              type="button"
              className="lunchbox__slot lunchbox__slot--filled"
              style={{ background: snack.bg }}
              aria-label={label}
              title={label}
              onClick={() => removeAt(i)}
            >
              <SnackShape id={id} />
            </button>
          )
        })}
      </LunchBoxShell>

      <p className="lunchbox__hint">
        {full ? '8칸을 다 채웠어요! 장바구니에 담아 주세요.' : '8칸을 다 채우면 장바구니에 담을 수 있어요. 담긴 칸을 누르면 비워져요.'}
      </p>
    </section>
  )
}
