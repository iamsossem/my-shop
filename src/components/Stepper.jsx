import './Stepper.css'

// − n + 개수 조절. 0이면 −, 칸이 가득 차면 + 비활성
export default function Stepper({ name, count, onDec, onInc, decDisabled, incDisabled }) {
  return (
    <div role="group" aria-label={`${name} 개수`} className="stepper">
      <button type="button" className="stepper__btn" aria-label={`${name} 빼기`} onClick={onDec} disabled={decDisabled}>
        −
      </button>
      <span aria-live="polite" className="stepper__count">
        {count}
      </span>
      <button type="button" className="stepper__btn" aria-label={`${name} 담기`} onClick={onInc} disabled={incDisabled}>
        +
      </button>
    </div>
  )
}
