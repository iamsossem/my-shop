import { Link } from 'react-router-dom'
import './Buttons.css'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

// 핵심 버튼 (B01·B04·B06만): 페이지 이동은 <a>, 같은 화면 동작은 <button>
export function CoreLink({ to, children, full = false }) {
  return (
    <Link to={to} viewTransition className={`btn-core${full ? ' btn-core--full' : ''}`}>
      {children}
      <ArrowIcon />
    </Link>
  )
}

export function CoreButton({ children, full = false, ...props }) {
  return (
    <button className={`btn-core${full ? ' btn-core--full' : ''}`} {...props}>
      {children}
      <ArrowIcon />
    </button>
  )
}

// 보조 버튼 (B02·B03·B08)
export function SubLink({ to, children }) {
  return (
    <Link to={to} viewTransition className="btn-sub">
      {children}
    </Link>
  )
}

// 링크 (B09 더보기)
export function MoreLink({ to, children }) {
  return (
    <Link to={to} viewTransition className="btn-more">
      {children}
      <ChevronIcon />
    </Link>
  )
}
