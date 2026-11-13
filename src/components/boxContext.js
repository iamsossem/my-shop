import { createContext, useContext } from 'react'

// 만드는 중인 박스(P02)와 장바구니(P04)를 정기배송 신청(P03)까지 이어서 쓰는 상태
export const BoxContext = createContext(null)

export function useBox() {
  return useContext(BoxContext)
}
