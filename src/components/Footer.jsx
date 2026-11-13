import { Link } from 'react-router-dom'
import Logo from './Logo'
import './Footer.css'

// 홈 하단 푸터 (시안 기준)
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo reverse showEnglish={false} />
            <p>
              우리 냥이가 좋아하는 수제간식을 맛과 개수까지 직접 골라 담아 매달 받아보는
              <br />
              정기배송 박스
            </p>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <span className="footer__label">MENU</span>
              <Link to="/">홈</Link>
              <Link to="/box">박스 만들기</Link>
              <Link to="/subscribe">정기배송 신청</Link>
            </div>
            <div className="footer__col">
              <span className="footer__label">DELIVERY</span>
              <span>매달 1회 정기배송</span>
              <span>정기배송 신청 시 5% 할인</span>
              <span>30,000원 이상 배송비 무료</span>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>이 사이트는 수업용 가상 사이트로, 실제 결제와 정보 저장은 하지 않아요.</span>
          <span>© 2026 골라담냥 Golla Damnyang</span>
        </div>
      </div>
    </footer>
  )
}
