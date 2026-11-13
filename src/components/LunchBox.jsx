import PillToggle from './PillToggle'
import SnackShape from './SnackShape'
import { useBox } from './boxContext'
import { CAT_OPTIONS, SLOTS_PER_CAT, SNACK_BY_ID } from '../data/snacks'
import './LunchBox.css'

// P02 S05 내 박스: 고양이 귀 도시락. 칸 하나 = 간식 1팩
// pending: 간식이 아직 날아오는 중인 칸 번호. 닿을 때까지 빈 칸으로 보인다
export default function LunchBox({ pending = [] }) {
  const { cats, order, capacity, full, setCats, removeAt } = useBox()
  const wide = cats > 1

  const catOptions = CAT_OPTIONS.map((n) => ({
    value: n,
    label: `${n}마리`,
    disabled: order.length > n * SLOTS_PER_CAT,
  }))

  return (
    <section className="lunchbox" aria-label="내 박스">
      <div className="lunchbox__head">
        <h2 className="lunchbox__title">내 박스</h2>
        <span className="lunchbox__count">
          <strong>{order.length}</strong> / {capacity}칸
        </span>
      </div>

      <PillToggle label="고양이 수" options={catOptions} value={cats} onChange={setCats} />

      <div className="lunchbox__box">
        <svg className="lunchbox__ears" viewBox="0 0 352 30" preserveAspectRatio="none" aria-hidden="true">
          <path d="M30 30 L46 4 L70 30 Z" fill="#2F7D4F" stroke="#2F7D4F" strokeWidth="6" strokeLinejoin="round" />
          <path d="M282 30 L306 4 L322 30 Z" fill="#2F7D4F" stroke="#2F7D4F" strokeWidth="6" strokeLinejoin="round" />
          <path d="M42 28 L48 14 L58 28 Z" fill="#F6B9A8" />
          <path d="M294 28 L304 14 L310 28 Z" fill="#F6B9A8" />
        </svg>
        <div className="lunchbox__body">
          <div className={`lunchbox__grid${wide ? ' lunchbox__grid--wide' : ''}`}>
            {Array.from({ length: capacity }, (_, i) => {
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
          </div>
        </div>
      </div>

      <p className="lunchbox__hint">
        {full ? '칸이 가득 찼어요. 고양이 수를 늘리면 더 담을 수 있어요.' : '담긴 칸을 누르면 그 칸이 비워져요.'}
      </p>
    </section>
  )
}
