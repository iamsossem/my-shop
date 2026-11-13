import { useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import SectionTitle from '../components/SectionTitle'
import SnackSetSlider from '../components/SnackSetSlider'
import StepFlow from '../components/StepFlow'
import GridDistortion from '../components/GridDistortion'
import { CoreLink, MoreLink, SubLink } from '../components/Buttons'
import { BEST_BOXES, CAT_SETS } from '../data/home'
import { SNACK_BY_ID } from '../data/snacks'
import heroImg from '../assets/P00/hero.png'
import './Home.css'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}

// S02 베스트 박스 카드: 구성품에 마우스를 올리면 사진 속 그 간식 자리를 표시
function BestBox({ box, reverse }) {
  const [active, setActive] = useState(null)
  const spot = active ? box.spots[active] : null

  return (
    <li className={`best-box${reverse ? ' best-box--reverse' : ''}`}>
      <div className="best-box__image" style={{ background: box.bg }}>
        <img src={box.image} alt={`${box.name} 이미지`} />
        {/* 표시 자리 판: 사진과 같은 원본 비율로 가운데 맞춰, 잘린 사진과 위치가 일치한다 */}
        <div className="best-box__spots">
          {spot && (
            <span
              className="best-box__spot"
              style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${spot.w}%`, height: `${spot.h}%` }}
              aria-hidden="true"
            >
              <span className="best-box__spot-label">{SNACK_BY_ID[active].name}</span>
            </span>
          )}
        </div>
        <span className="best-box__rank" aria-label={`BEST ${box.rank}`}>
          <small>BEST</small>
          <strong>{box.rank}</strong>
        </span>
      </div>
      <div className="best-box__info">
        <div className="best-box__head">
          <span className="best-box__label">{box.items.length}가지 맛 · 매달 1회 배송</span>
          <h3 className="best-box__name">{box.name}</h3>
        </div>
        <ul className="best-box__items" onMouseLeave={() => setActive(null)}>
          {box.items.map((id) => (
            <li
              key={id}
              tabIndex={0}
              className={active === id ? 'is-active' : undefined}
              onMouseEnter={() => setActive(id)}
              onFocus={() => setActive(id)}
              onBlur={() => setActive(null)}
            >
              <span className="best-box__thumb" style={{ background: SNACK_BY_ID[id].bg }}>
                <img src={SNACK_BY_ID[id].image} alt="" />
              </span>
              {SNACK_BY_ID[id].name}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

// P01 홈
export default function Home() {
  return (
    <div className="home">
      <NavBar overlay />

      {/* S01 첫 화면 */}
      <section className="hero" aria-labelledby="hero-title">
        {/* 배경: React Bits GridDistortion (마우스를 따라 격자 칸이 끌려가는 효과) */}
        <div className="hero__bg">
          <GridDistortion
            imageSrc={heroImg}
            grid={15}
            radius={0.18}
            strength={0.15}
            relaxation={0.96}
            mode="drag"
            softness={0}
            chroma={0}
            idle={0.3}
            clickRipple
            intro
            offsetX={0.16}
          />
        </div>
        <div className="container hero__inner">
          <span className="hero__chip">
            <CalendarIcon />
            매달 1회 정기배송 · 신청하면 5% 할인
          </span>
          <h1 className="hero__title" id="hero-title">
            간식 고민 끝,<br />
            <span className="hero__mark">입맛대로 골라 담아요</span>
          </h1>
          <p className="hero__desc">
            골라담냥은 우리 냥이가 좋아하는 수제간식을 맛과 개수까지 직접 골라 담아 매달 받아보는 정기배송 박스
            사이트예요.
          </p>
          <div>
            <CoreLink to="/box">박스 만들기 시작</CoreLink>
          </div>
        </div>
      </section>

      {/* S02 베스트 간식 박스 */}
      <section className="home-section home-section--tint" aria-labelledby="best-title">
        <div className="container home-section__inner">
          <SectionTitle id="best-title" eyebrow="BEST BOX" title="뭘 담을지 고민될 땐, 베스트 박스" right={<MoreLink to="/box">더보기</MoreLink>} />
          <ul className="best-list">
            {BEST_BOXES.map((box, i) => (
              <BestBox key={box.rank} box={box} reverse={i % 2 === 1} />
            ))}
          </ul>
          <div className="home-section__action">
            <SubLink to="/box">박스 만들기로 이동</SubLink>
          </div>
        </div>
      </section>

      {/* S11 다른 집사들의 간식 세트 */}
      <section className="home-section" aria-labelledby="sets-title">
        <div className="container home-section__inner">
          <SectionTitle
            id="sets-title"
            eyebrow="SNACK SETS"
            title="다른 집사들은 이렇게 담았어요"
            right={<span className="home-section__status">옆으로 넘기며 구경해 보세요 →</span>}
          />
          <SnackSetSlider sets={CAT_SETS} />
          <div className="home-section__action home-section__action--end">
            <SubLink to="/box">나도 간식 박스 만들기</SubLink>
          </div>
        </div>
      </section>

      {/* S03 정기배송 안내 */}
      <section className="home-section home-section--tint" aria-labelledby="how-title">
        <div className="container home-section__inner home-section__inner--wide">
          <SectionTitle
            id="how-title"
            center
            eyebrow="HOW IT WORKS"
            title="매달 간식 사러 갈 필요 없어요"
            desc={
              <>
                배송은 <strong>매달 1회</strong>로 고정돼요. 세 단계면 끝!
              </>
            }
          />
          <StepFlow />
          <div className="home-section__action">
            <SubLink to="/box">박스 만들기</SubLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
