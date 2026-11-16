import { useEffect, useRef, useState } from 'react'
import { SNACK_BY_ID } from '../data/snacks'
import './SnackSetSlider.css'
import './SnackSetSwipe.css'

// 터치 기기 전용 간식 세트 슬라이더 (docs/interaction.md #22 축소, #23 제거)
// 데스크톱 SnackSetSlider는 그대로 두고, 터치 기기에서만 이 컴포넌트로 바꿔 그린다 (pages/Home.jsx)
// - 손가락으로 밀어 넘기기(scroll-snap). 카드 폭은 화면에 맞춘다 (CSS)
// - 화살표는 뺀다. 진행 점은 남긴다
// - 4초 자동 넘김은 남기되, 손을 대고 있는 동안은 멈추고 손을 떼면 다시 4초를 센다. hover 멈춤은 없다
const INTERVAL_MS = 4000

export default function SnackSetSwipe({ sets }) {
  const n = sets.length
  const viewportRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [touching, setTouching] = useState(false)
  const [rest, setRest] = useState(0)

  const cardsOf = () => viewportRef.current?.querySelectorAll('.set-card') ?? []

  const scrollToCard = (i) => {
    const vp = viewportRef.current
    const card = cardsOf()[i]
    if (!vp || !card) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    vp.scrollTo({ left: card.offsetLeft - cardsOf()[0].offsetLeft, behavior: smooth ? 'smooth' : 'auto' })
  }

  // 스크롤 위치로 지금 맨 앞 카드를 찾아 진행 점에 반영
  const handleScroll = () => {
    const vp = viewportRef.current
    const cards = cardsOf()
    if (!vp || !cards.length) return
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth
    const atEnd = vp.scrollLeft + vp.clientWidth >= vp.scrollWidth - 2
    const i = atEnd ? n - 1 : Math.min(n - 1, Math.max(0, Math.round(vp.scrollLeft / step)))
    activeRef.current = i
    setActive(i)
  }

  // 자동 넘김: 마지막 다음은 처음으로 되감는다. 모션 줄이기 설정이면 자동으로 넘기지 않는다
  useEffect(() => {
    if (touching || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const t = setInterval(() => scrollToCard((activeRef.current + 1) % n), INTERVAL_MS)
    return () => clearInterval(t)
    // scrollToCard는 ref만 읽으므로 매번 새로 만들어져도 결과가 같다
  }, [touching, rest, n]) // eslint-disable-line react-hooks/exhaustive-deps

  const release = () => {
    setTouching(false)
    setRest((r) => r + 1)
  }

  return (
    <div className="set-slider set-slider--swipe" data-reveal>
      <div
        ref={viewportRef}
        className="set-slider__viewport"
        onScroll={handleScroll}
        onTouchStart={() => setTouching(true)}
        onTouchEnd={release}
        onTouchCancel={release}
      >
        <ul className="set-slider__track">
          {sets.map((set) => (
            <li key={set.name} className="set-card">
              <div className="set-card__image" style={{ background: set.bg }}>
                <img src={set.image} alt={`${set.name} 고양이 사진`} />
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
              onClick={() => {
                setRest((r) => r + 1)
                scrollToCard(i)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
