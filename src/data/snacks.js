import tunaImg from '../assets/P02/snack-tuna.png'
import chickenImg from '../assets/P02/snack-chicken.png'
import salmonImg from '../assets/P02/snack-salmon.png'
import pollackImg from '../assets/P02/snack-pollack.png'
import duckImg from '../assets/P02/snack-duck.png'
import crunchImg from '../assets/P02/snack-crunch.png'

// 간식 6종 · 개당 가격 (PROJECT_CONTEXT 3-3), 판 색·도형 색 (06-site-design 3-5)
export const SNACKS = [
  { id: 'tuna', name: '참치 스틱', price: 2500, image: tunaImg, bg: 'var(--pastel-coral)', color: 'var(--snack-tuna)' },
  { id: 'chicken', name: '닭가슴살 트릿', price: 3000, image: chickenImg, bg: 'var(--pastel-butter)', color: 'var(--snack-chicken)' },
  { id: 'salmon', name: '연어 큐브', price: 3500, image: salmonImg, bg: 'var(--pastel-peach)', color: 'var(--snack-salmon)' },
  { id: 'pollack', name: '북어 트릿', price: 2000, image: pollackImg, bg: 'var(--pastel-sand)', color: 'var(--snack-pollack)' },
  { id: 'duck', name: '오리 져키', price: 4000, image: duckImg, bg: 'var(--pastel-mocha)', color: 'var(--snack-duck)' },
  { id: 'crunch', name: '치킨 크런치', price: 3000, image: crunchImg, bg: 'var(--pastel-butter)', color: 'var(--snack-crunch)' },
]

export const SNACK_BY_ID = Object.fromEntries(SNACKS.map((s) => [s.id, s]))

// 고양이 1마리당 도시락 8칸, 1~3마리
export const SLOTS_PER_CAT = 8
export const CAT_OPTIONS = [1, 2, 3]
