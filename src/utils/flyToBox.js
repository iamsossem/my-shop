// P02 담기 모션: 간식 사진 여러 장이 꼬리처럼 이어져 날아가 내 박스 칸으로 들어간다
// 참고: Codrops "From Product to Cart" — 사진 묶음이 한 번 바깥으로 빠졌다가(40% 지점) 장바구니로 모이는 2단 경로
export const FLY_TRAIL = 6 // 날아가는 사진 장수 (원문 갤러리 6장)
export const FLY_MS = 1200 // 한 장이 날아가는 시간
export const FLY_STAGGER_MS = 40 // 장마다 출발 간격 (원문 0.04초)
const EASE = 'cubic-bezier(0.45, 0, 0.55, 1)' // 원문 power2.inOut과 비슷한 곡선

// 끝까지 다 날아가면 resolve. 남은 복제 사진은 스스로 지운다
export function flyToBox(fromEl, toEl, bg) {
  const from = fromEl.getBoundingClientRect()
  const to = toEl.getBoundingClientRect()
  const dx = to.left + to.width / 2 - (from.left + from.width / 2)
  const dy = to.top + to.height / 2 - (from.top + from.height / 2)
  // 화면 위쪽 카드는 아래로, 아래쪽 카드는 위로 한 번 빠졌다가 박스로 향한다
  const upper = from.top + from.height / 2 < window.innerHeight / 2
  const detourY = (upper ? 1 : -1) * from.height * 0.8
  const endScale = Math.max(to.width / from.width, to.height / from.height)

  const layer = document.createElement('div')
  layer.className = 'fly-layer'
  layer.setAttribute('aria-hidden', 'true')
  document.body.append(layer)

  const src = fromEl.currentSrc || fromEl.src
  const flights = Array.from({ length: FLY_TRAIL }, (_, i) => {
    const item = document.createElement('div')
    item.className = 'fly-item'
    Object.assign(item.style, {
      left: `${from.left}px`,
      top: `${from.top}px`,
      width: `${from.width}px`,
      height: `${from.height}px`,
      background: bg,
    })
    const img = document.createElement('img')
    img.src = src
    img.alt = ''
    item.append(img)
    layer.append(item)

    // 맨 위(마지막) 장이 먼저 출발하고 아래 장들이 뒤따른다 (원문 stagger from: 'end')
    const anim = item.animate(
      [
        { offset: 0, transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { offset: 0.4, transform: `translate(0, ${detourY}px) scale(0.6)`, opacity: 1 },
        { offset: 0.9, opacity: 1 },
        { offset: 1, transform: `translate(${dx}px, ${dy}px) scale(${endScale})`, opacity: 0 },
      ],
      { duration: FLY_MS, delay: (FLY_TRAIL - 1 - i) * FLY_STAGGER_MS, easing: EASE, fill: 'both' },
    )
    return anim.finished.catch(() => {})
  })

  return Promise.all(flights).then(() => layer.remove())
}
