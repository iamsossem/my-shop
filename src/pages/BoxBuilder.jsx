import { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import SnackCard from '../components/SnackCard'
import LunchBox from '../components/LunchBox'
import PriceSummary from '../components/PriceSummary'
import { CoreLink } from '../components/Buttons'
import { useBox } from '../components/boxContext'
import { SNACKS } from '../data/snacks'
import { flyToBox } from '../utils/flyToBox'
import './BoxBuilder.css'

// P02 박스 만들기
export default function BoxBuilder() {
  const { order, full, add, removeOne } = useBox()
  // 날아오는 중인 칸 번호들, 지금 강조 중인 카드
  const [pending, setPending] = useState([])
  const [focusId, setFocusId] = useState(null)
  const asideRef = useRef(null)
  const focusTimer = useRef(0)

  useEffect(() => () => clearTimeout(focusTimer.current), [])

  // +를 누르면: 바로 담고(합계도 바로 반영), 사진 꼬리가 박스의 그 칸까지 날아간 뒤 칸이 채워진다
  const handleInc = (snack, imgEl) => {
    if (full) return
    const slot = order.length
    add(snack.id)
    if (!imgEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setPending((p) => [...p, slot])
    setFocusId(snack.id)
    clearTimeout(focusTimer.current)
    focusTimer.current = setTimeout(() => setFocusId(null), 1000)

    // 칸 번호가 그려진 다음 프레임에 목적지 위치를 잰다
    requestAnimationFrame(() => {
      const target = asideRef.current?.querySelector(`[data-slot="${slot}"]`)
      const done = () => setPending((p) => p.filter((i) => i !== slot))
      if (!target) return done()
      flyToBox(imgEl, target, snack.bg).then(done)
    })
  }

  return (
    <div className="page">
      <NavBar />
      <main className="container page__main">
        <div className="page__head">
          <span className="page__eyebrow">MAKE MY BOX</span>
          <h1 className="page__title">우리 냥이 입맛대로 채워 볼까요?</h1>
          <p className="page__desc">
            <strong>+</strong>를 누르면 바로 담기고, 합계도 바로 보여요. 여러 마리라면 고양이 수부터 골라 주세요.
          </p>
        </div>

        <div className="builder">
          {/* S04 간식 선택 영역 */}
          <section aria-label="간식 선택" className={`builder__snacks${focusId ? ' builder__snacks--focus' : ''}`}>
            {SNACKS.map((s) => (
              <SnackCard
                key={s.id}
                snack={s}
                count={order.filter((id) => id === s.id).length}
                full={full}
                focus={focusId === s.id}
                onInc={(imgEl) => handleInc(s, imgEl)}
                onDec={() => removeOne(s.id)}
              />
            ))}
          </section>

          {/* 오른쪽 고정 영역: S05 → S06 → B04 */}
          <aside ref={asideRef} aria-label="내 박스와 요약" className="builder__aside">
            <LunchBox pending={pending} />
            <PriceSummary order={order} />
            <CoreLink to="/subscribe" full>
              정기배송 신청으로 이동
            </CoreLink>
          </aside>
        </div>
      </main>
    </div>
  )
}
