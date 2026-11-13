import { useRef } from 'react'
import Stepper from './Stepper'
import { won } from '../data/pricing'
import './SnackCard.css'

// P02 S04 간식 카드: 이미지(220px, 가장자리까지) → 이름·가격 + Stepper
// onInc에는 날아갈 출발점이 되는 사진 요소를 넘긴다. focus: 담기 모션 중 강조되는 카드
export default function SnackCard({ snack, count, full, focus, revealIndex = 0, onInc, onDec }) {
  const imgRef = useRef(null)
  const picked = count > 0
  return (
    <article
      className={`snack-card${picked ? ' snack-card--picked' : ''}${focus ? ' snack-card--focus' : ''}`}
      data-reveal
      style={{ '--reveal-i': revealIndex }}
    >
      <div className="snack-card__image" style={{ background: snack.bg }}>
        <img ref={imgRef} src={snack.image} alt={snack.name} />
        {picked && <span className="snack-card__badge">{count}팩 담김</span>}
      </div>
      <div className="snack-card__info">
        <div className="snack-card__text">
          <h2 className="snack-card__name">{snack.name}</h2>
          <p className="snack-card__price">
            <strong>{won(snack.price)}</strong> / 1팩
          </p>
        </div>
        <Stepper
          name={snack.name}
          count={count}
          onDec={onDec}
          onInc={() => onInc(imgRef.current)}
          decDisabled={count === 0}
          incDisabled={full}
        />
      </div>
    </article>
  )
}
