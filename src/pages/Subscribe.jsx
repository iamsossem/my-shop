import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import PriceSummary from '../components/PriceSummary'
import { CoreButton, MoreLink } from '../components/Buttons'
import { useBox } from '../components/boxContext'
import { SNACKS } from '../data/snacks'
import { won } from '../data/pricing'
import catImg from '../assets/P00/hero.png'
import doneImg from '../assets/logo/lunchbox-illustration.svg'
import '../pages/BoxBuilder.css'
import './Subscribe.css'

// P03 정기배송 신청 (시안 없음: 와이어프레임 + 디자인 시스템으로 구성)
export default function Subscribe() {
  const { order, reset } = useBox()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)

  const items = SNACKS.map((s) => ({ ...s, count: order.filter((id) => id === s.id).length })).filter(
    (s) => s.count > 0,
  )
  const empty = items.length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    setDone(true)
  }

  // B07 확인: 팝업을 닫고 홈으로 이동
  const handleConfirm = () => {
    setDone(false)
    reset()
    navigate('/')
  }

  return (
    <div className="page">
      <NavBar />
      <main className="container page__main">
        <div className="page__head">
          <span className="page__eyebrow">SUBSCRIBE</span>
          <h1 className="page__title">거의 다 왔어요! 받을 곳만 알려 주세요</h1>
          <p className="page__desc">로그인 없이 이름, 연락처, 배송지만 적으면 끝이에요.</p>
        </div>

        <div className="subscribe">
          {/* S07 왼쪽: 고양이 이미지 패널 */}
          <div className="subscribe__visual">
            <img src={catImg} alt="간식 박스 옆에 앉은 고양이" />
          </div>

          {/* 오른쪽 흐름: 구성(S07) → 요약·가격(S07) → 신청 입력(S08) → B06 */}
          <form className="subscribe__flow" onSubmit={handleSubmit}>
            <section className="order-list" aria-labelledby="order-title">
              <div className="order-list__head">
                <h2 id="order-title">내 박스 구성</h2>
                <span>
                  <strong>{order.length}</strong>팩
                </span>
              </div>
              {empty ? (
                <div className="order-list__empty">
                  <p>아직 박스가 비어 있어요. 간식부터 골라 볼까요?</p>
                  <MoreLink to="/box">박스 만들기</MoreLink>
                </div>
              ) : (
                <ul>
                  {items.map((s) => (
                    <li key={s.id} className="order-list__item">
                      <span className="order-list__thumb" style={{ background: s.bg }}>
                        <img src={s.image} alt="" />
                      </span>
                      <span className="order-list__name">{s.name}</span>
                      <span className="order-list__count">{s.count}개</span>
                      <span className="order-list__price">{won(s.price * s.count)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <PriceSummary order={order} showHint={false} />

            {/* S08 신청 입력: 로그인 없이 이름·연락처·배송지 */}
            <section className="apply-form" aria-labelledby="apply-title">
              <h2 id="apply-title">받으실 분</h2>
              <label className="field">
                <span className="field__label">이름</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className="field">
                <span className="field__label">연락처</span>
                <input type="tel" name="phone" autoComplete="tel" required />
              </label>
              <label className="field">
                <span className="field__label">배송지</span>
                <input type="text" name="address" autoComplete="street-address" required />
              </label>
            </section>

            <CoreButton type="submit" full disabled={empty}>
              정기배송 신청 완료
            </CoreButton>
          </form>
        </div>
      </main>

      {/* S09 완료 안내 팝업 */}
      {done && (
        <div className="modal" role="presentation">
          <div className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="done-title">
            <img className="modal__image" src={doneImg} alt="" />
            <h2 id="done-title" className="modal__title">
              신청 완료! 간식 박스를 준비할게요
            </h2>
            <p className="modal__desc">매달 1회, 골라 담은 그대로 보내 드려요.</p>
            <button type="button" className="btn-sub modal__btn" onClick={handleConfirm} autoFocus>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
