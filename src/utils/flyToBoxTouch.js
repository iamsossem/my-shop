// 터치 기기 담기 모션 (docs/interaction.md #25 축소): 데스크톱의 사진 6장 꼬리(flyToBox) 대신
// 사진 1장이 0.6초 만에 목적지로 날아간다. 복제 사진 모양은 base.css의 .fly-layer / .fly-item을 그대로 쓴다
const DURATION = 600
const EASE = 'cubic-bezier(0.45, 0, 0.55, 1)'

export function flyToBoxTouch(fromEl, toEl, bg) {
  const from = fromEl.getBoundingClientRect()
  const to = toEl.getBoundingClientRect()
  const dx = to.left + to.width / 2 - (from.left + from.width / 2)
  const dy = to.top + to.height / 2 - (from.top + from.height / 2)
  const endScale = Math.max(to.width / from.width, to.height / from.height, 0.08)

  const layer = document.createElement('div')
  layer.className = 'fly-layer'
  layer.setAttribute('aria-hidden', 'true')
  document.body.append(layer)

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
  img.src = fromEl.currentSrc || fromEl.src
  img.alt = ''
  item.append(img)
  layer.append(item)

  const anim = item.animate(
    [
      { offset: 0, transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { offset: 0.85, opacity: 1 },
      { offset: 1, transform: `translate(${dx}px, ${dy}px) scale(${endScale})`, opacity: 0 },
    ],
    { duration: DURATION, easing: EASE, fill: 'both' },
  )
  return anim.finished.catch(() => {}).then(() => layer.remove())
}
