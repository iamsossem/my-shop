import './PillToggle.css'

// 알약형 토글: 선택 값만 green-800으로 채우고 나머지는 외곽선
export default function PillToggle({ label, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className="pill-toggle">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          className="pill-toggle__item"
          disabled={o.disabled && o.value !== value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
