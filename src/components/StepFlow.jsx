import { useState } from 'react'
import step1 from '../assets/P01/step-1.svg'
import step2 from '../assets/P01/step-2.svg'
import step3 from '../assets/P01/step-3.svg'
import './StepFlow.css'

// 시안의 선 아이콘. 단계 이미지가 열리지 않을 때 대신 보여 준다.
const FALLBACK_ICONS = [
  <svg key="1" viewBox="0 0 64 64" width="72" height="72" aria-hidden="true" fill="currentColor">
    <ellipse cx="32" cy="42" rx="14" ry="11" />
    <circle cx="16" cy="28" r="6" />
    <circle cx="25" cy="18" r="6" />
    <circle cx="39" cy="18" r="6" />
    <circle cx="48" cy="28" r="6" />
  </svg>,
  <svg key="2" viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 22 L18 10 L25 19" />
    <path d="M39 19 L46 10 L50 22" />
    <rect x="8" y="20" width="48" height="36" rx="10" />
    <path d="M32 30v16M24 38h16" />
  </svg>,
  <svg key="3" viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8" y="12" width="48" height="44" rx="8" />
    <path d="M8 24h48M20 6v10M44 6v10" />
    <path d="M24 40l6 6 12-12" />
  </svg>,
]

const STEPS = [
  { title: '간식 고르기', desc: '6가지 수제간식 중 우리 냥이 입맛대로', image: step1, bg: 'var(--pastel-mint)' },
  { title: '장바구니 담고 신청', desc: '8칸을 채워 장바구니에 담으면 신청 끝', image: step2, bg: 'var(--pastel-butter)' },
  { title: '매달 1회 받아보기', desc: '한 달에 한 번, 박스가 알아서 찾아와요', image: step3, bg: 'var(--pastel-peach)' },
]

function StepIcon({ src, index }) {
  const [failed, setFailed] = useState(false)
  if (failed) return FALLBACK_ICONS[index]
  return <img className="step-flow__img" src={src} alt="" onError={() => setFailed(true)} />
}

function Arrow({ index }) {
  return (
    <li className="step-flow__arrow" aria-hidden="true" data-reveal style={{ '--reveal-i': index * 2 + 1 }}>
      <svg viewBox="0 0 48 24" width="48" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h42M36 4l8 8-8 8" />
      </svg>
    </li>
  )
}

// 홈 S03 정기배송 3단계 흐름도
export default function StepFlow() {
  return (
    <ol className="step-flow">
      {STEPS.map((s, i) => (
        <StepItem key={s.title} step={s} index={i} last={i === STEPS.length - 1} />
      ))}
    </ol>
  )
}

function StepItem({ step, index, last }) {
  return (
    <>
      <li className="step-flow__step" data-reveal style={{ '--reveal-i': index * 2 }}>
        <div className="step-flow__disc" style={{ background: step.bg }}>
          <span className="step-flow__num">{index + 1}</span>
          <StepIcon src={step.image} index={index} />
        </div>
        <div>
          <h3 className="step-flow__title">{step.title}</h3>
          <p className="step-flow__desc">{step.desc}</p>
        </div>
      </li>
      {!last && <Arrow index={index} />}
    </>
  )
}
