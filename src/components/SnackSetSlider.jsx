import { useEffect, useState } from 'react'
import { SNACK_BY_ID } from '../data/snacks'
import './SnackSetSlider.css'

// 슬라이드 기본값: 카드 1장씩 4초 간격, 마우스를 올리면 멈춤 (5단계에서 최종 확정)
const INTERVAL_MS = 4000
const CARD_WIDTH = 300
const GAP = 24
// 끊김 없이 계속 돌도록 카드 목록을 3벌 이어 붙이고, 가운데 벌을 기준으로 움직인다
const COPIES = 3
const TRANSITION_MS = 800

function ArrowIcon({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'prev' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
    </svg>
  )
}

// 홈 S11 다른 집사들의 간식 세트 (무한 자동 슬라이드)
export default function SnackSetSlider({ sets }) {
  const n = sets.length
  // pos: 3벌 중 몇 번째 카드가 맨 왼쪽인지. 가운데 벌(n ~ 2n-1) 안에 있도록 유지한다
  const [pos, setPos] = useState(n)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const active = pos % n

  useEffect(() => {
    if (paused) return undefined
    const t = setInterval(() => setPos((p) => p + 1), INTERVAL_MS)
    return () => clearInterval(t)
  }, [paused])

  // 가운데 벌을 벗어나면, 이동 애니메이션이 끝난 뒤 같은 카드가 있는 가운데 벌 자리로 애니메이션 없이 되돌린다
  // (transitionend는 탭이 가려져 있으면 안 올 수 있어 타이머로 처리)
  useEffect(() => {
    if (pos >= n && pos < 2 * n) return undefined
    const t = setTimeout(() => {
      setAnimate(false)
      setPos((p) => n + (((p - n) % n) + n) % n)
    }, TRANSITION_MS)
    return () => clearTimeout(t)
  }, [pos, n])

  // 되돌린 다음 프레임에 애니메이션을 다시 켠다
  useEffect(() => {
    if (animate) return undefined
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setAnimate(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [animate])

  const go = (step) => {
    if (!animate) return
    setPos((p) => p + step)
  }

  const items = Array.from({ length: COPIES }, (_, c) => sets.map((set, i) => ({ set, key: `${c}-${i}`, clone: c !== 1 }))).flat()

  return (
    <div className="set-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="set-slider__viewport">
        <ul
          className={`set-slider__track${animate ? '' : ' set-slider__track--instant'}`}
          style={{ transform: `translateX(-${pos * (CARD_WIDTH + GAP)}px)`, transitionDuration: `${TRANSITION_MS}ms` }}
        >
          {items.map(({ set, key, clone }) => (
            <li key={key} className="set-card" aria-hidden={clone || undefined}>
              <div className="set-card__image" style={{ background: set.bg }}>
                <img src={set.image} alt={clone ? '' : `${set.name} 고양이 사진`} />
              </div>
              <div className="set-card__info">
                <h3 className="set-card__name">{set.name}</h3>
                <div className="set-card__tags">
                  <span className="set-card__tag">종</span>
                  <span className="set-card__tag">나이</span>
                  <span className="set-card__tag">취향</span>
                </div>
                <p className="set-card__items">{set.items.map((id) => SNACK_BY_ID[id].name).join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 진행 점 + 왼쪽·오른쪽 이동 버튼 */}
      <div className="set-slider__controls">
        <div className="set-slider__dots" role="tablist" aria-label="간식 세트 진행">
          {sets.map((set, i) => (
            <button
              key={set.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`${i + 1}번째 세트`}
              className="set-slider__dot"
              onClick={() => animate && setPos(n + i)}
            />
          ))}
        </div>
        <div className="set-slider__arrows">
          <button type="button" className="set-slider__arrow" aria-label="이전 세트" onClick={() => go(-1)}>
            <ArrowIcon dir="prev" />
          </button>
          <button type="button" className="set-slider__arrow" aria-label="다음 세트" onClick={() => go(1)}>
            <ArrowIcon dir="next" />
          </button>
        </div>
      </div>
    </div>
  )
}
