import './Marquee.css'

function Paw() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <ellipse cx="12" cy="16" rx="5.2" ry="4.4" />
      <ellipse cx="5.2" cy="10.2" rx="2.2" ry="2.8" />
      <ellipse cx="9.4" cy="6.4" rx="2.2" ry="2.9" />
      <ellipse cx="14.6" cy="6.4" rx="2.2" ry="2.9" />
      <ellipse cx="18.8" cy="10.2" rx="2.2" ry="2.8" />
    </svg>
  )
}

// 끝없이 옆으로 흐르는 띠 배너. 같은 목록을 두 벌 이어 붙이고 절반만큼 움직여 이음매 없이 돈다
export default function Marquee({ items }) {
  const row = (copy) => (
    <ul className="marquee__row" aria-hidden={copy ? 'true' : undefined}>
      {[...items, ...items].map((text, i) => (
        <li key={i} className="marquee__item">
          <span>{text}</span>
          <Paw />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" role="note" aria-label={items.join(', ')}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
