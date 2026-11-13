import { createContext, useContext } from 'react'

// P02에서 담은 내용(고양이 수, 칸 순서)을 P03까지 이어서 쓰는 상태
export const BoxContext = createContext(null)

export function useBox() {
  return useContext(BoxContext)
}
