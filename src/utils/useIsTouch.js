import { useSyncExternalStore } from 'react'

// 터치 기기(휴대폰·태블릿) 판정. docs/interaction.md의 모바일 처리제안은 이 조건일 때만 적용한다.
// 화면 폭이 아니라 기기 입력 방식으로 판정하므로, 데스크톱 브라우저 창을 좁혀도 데스크톱 동작은 그대로다.
// CSS(src/styles/touch.css)도 같은 조건을 쓴다: @media (hover: none) and (pointer: coarse)
export const TOUCH_QUERY = '(hover: none) and (pointer: coarse)'

export const isTouch = () => typeof window !== 'undefined' && window.matchMedia(TOUCH_QUERY).matches

const subscribe = (onChange) => {
  const mq = window.matchMedia(TOUCH_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

export default function useIsTouch() {
  return useSyncExternalStore(subscribe, isTouch, () => false)
}
