import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { useBox } from './boxContext'
import './NavBar.css'

// 공통 상단 메뉴. 현재 페이지는 회색 알약 + aria-current (NavLink 기본 동작)
// 장바구니에는 담긴 박스 수 배지. 장바구니 담기 모션이 도착하면(cart:landed) 배지가 튀어 오른다
const MENU = [
  { id: 'M02', label: '홈', to: '/' },
  { id: 'M03', label: '박스 만들기', to: '/box' },
  { id: 'M04', label: '장바구니', to: '/cart', cart: true },
]

export default function NavBar({ overlay = false }) {
  const { cart } = useBox()
  const [bump, setBump] = useState(0)

  useEffect(() => {
    const onLanded = () => setBump((b) => b + 1)
    window.addEventListener('cart:landed', onLanded)
    return () => window.removeEventListener('cart:landed', onLanded)
  }, [])

  return (
    <header className={`navbar${overlay ? ' navbar--overlay' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" viewTransition className="navbar__logo" aria-label="골라담냥 홈으로">
          <Logo />
        </Link>
        <nav aria-label="주요 메뉴" className="navbar__menu">
          {MENU.map((m) => (
            <NavLink
              key={m.id}
              to={m.to}
              end
              viewTransition
              className="navbar__link"
              data-cart-target={m.cart ? '' : undefined}
              aria-label={m.cart ? `장바구니, 박스 ${cart.length}개` : undefined}
            >
              {m.label}
              {m.cart && (
                <span key={bump} className={`navbar__badge${bump ? ' navbar__badge--bump' : ''}`} aria-hidden="true">
                  {cart.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
