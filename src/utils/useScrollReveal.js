import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 스크롤 등장 모션: data-reveal이 붙은 요소가 화면에 들어오면 아래에서 떠오르며 나타난다.
// 같은 묶음 안 순서는 style의 --reveal-i(0, 1, 2 …)로 0.09초씩 늦춘다. 모션 줄이기 설정이면 끈다.
// 등장 표시는 class가 아니라 data-revealed 속성으로 한다. class는 React가 다시 그릴 때 덮어써서
// (예: 간식 카드에 '담김' class가 붙을 때) 표시가 지워지고 카드가 다시 숨겨지기 때문이다.
export default function useScrollReveal() {
  const { pathname } = useLocation()

  // 그리기 전에 숨겨 두어야 깜빡이지 않는다
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined
    document.documentElement.classList.add('reveal-on')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.setAttribute('data-revealed', '')
          io.unobserve(e.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    // 처음부터 화면 안에 있는 것은 감시를 기다리지 않고 바로 등장시킨다 (감시가 늦거나 안 와도 첫 화면은 보이게)
    document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.setAttribute('data-revealed', '')
      else io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])
}
