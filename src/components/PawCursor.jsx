import { useEffect, useRef } from 'react'
import './PawCursor.css'

const PAW = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <ellipse cx="12" cy="16" rx="5.2" ry="4.4" />
    <ellipse cx="5.2" cy="10.2" rx="2.2" ry="2.8" />
    <ellipse cx="9.4" cy="6.4" rx="2.2" ry="2.9" />
    <ellipse cx="14.6" cy="6.4" rx="2.2" ry="2.9" />
    <ellipse cx="18.8" cy="10.2" rx="2.2" ry="2.8" />
  </svg>
)

const INTERACTIVE = 'a, button, [role="button"], select, label, summary, [tabindex]:not([tabindex="-1"])'
const TEXT = 'input, textarea, [contenteditable="true"]'
const SIZE = 36 // 발바닥 크기(px). 가운데가 마우스 끝 위치

// 고양이 발바닥 커서: 원래 화살표 커서를 숨기고 발바닥이 커서가 된다. 마우스 위치에 지연 없이 딱 붙어 움직인다.
// 누를 수 있는 것 위에서는 커지고 포인트 색, 글자 입력칸 위에서는 원래 글자 커서를 보여 준다.
// 클릭하면 그 자리에 발도장이 찍혔다 사라진다. 마우스(정밀 포인터)가 있고 모션 줄이기 설정이 아닐 때만 켠다
export default function PawCursor() {
  const pawRef = useRef(null)
  const layerRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const paw = pawRef.current
    const layer = layerRef.current
    const root = document.documentElement
    if (!fine || reduce || !paw || !layer) return undefined

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      // 처음 움직일 때 원래 커서를 숨긴다 (그 전에는 원래 커서가 보이게)
      root.classList.add('paw-on')
      paw.style.translate = `${e.clientX - SIZE / 2}px ${e.clientY - SIZE / 2}px`
      const el = e.target instanceof Element ? e.target : null
      paw.classList.add('is-visible')
      paw.classList.toggle('is-text', !!el?.closest(TEXT))
      paw.classList.toggle('is-hover', !!el?.closest(INTERACTIVE))
    }
    const onLeave = () => paw.classList.remove('is-visible')
    const onDown = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      if (e.target instanceof Element && e.target.closest(TEXT)) return
      const stamp = document.createElement('span')
      stamp.className = 'paw-stamp'
      stamp.innerHTML = paw.innerHTML
      stamp.style.left = `${e.clientX}px`
      stamp.style.top = `${e.clientY}px`
      stamp.style.setProperty('--r', `${Math.round(Math.random() * 50 - 25)}deg`)
      layer.append(stamp)
      stamp.addEventListener('animationend', () => stamp.remove())
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    root.addEventListener('mouseleave', onLeave)
    return () => {
      root.classList.remove('paw-on')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      root.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={layerRef} className="paw-layer" aria-hidden="true">
      <span ref={pawRef} className="paw-cursor">
        {PAW}
      </span>
    </div>
  )
}
