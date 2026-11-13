import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import './NavBar.css'

// 공통 상단 메뉴 M01~M04. 현재 페이지는 회색 알약 + aria-current (NavLink 기본 동작)
const MENU = [
  { id: 'M02', label: '홈', to: '/' },
  { id: 'M03', label: '박스 만들기', to: '/box' },
  { id: 'M04', label: '정기배송 신청', to: '/subscribe' },
]

export default function NavBar({ overlay = false }) {
  return (
    <header className={`navbar${overlay ? ' navbar--overlay' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="골라담냥 홈으로">
          <Logo />
        </Link>
        <nav aria-label="주요 메뉴" className="navbar__menu">
          {MENU.map((m) => (
            <NavLink key={m.id} to={m.to} end className="navbar__link">
              {m.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
