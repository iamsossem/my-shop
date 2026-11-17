import bestBox1 from '../assets/P01/best-box-1.png'
import bestBox2 from '../assets/P01/best-box-2.png'
import catSet1 from '../assets/P01/cat-set-1.jpg'
import catSet2 from '../assets/P01/cat-set-2.jpg'
import catSet3 from '../assets/P01/cat-set-3.jpg'
import catSet4 from '../assets/P01/cat-set-4.jpg'

// S02 베스트 간식 박스 (시안 기준 2개, 예시 구성 · 확정 전)
export const BEST_BOXES = [
  { rank: 1, name: '생선파 냥이의 최애 조합', image: bestBox1, bg: 'var(--pastel-peach)', items: ['tuna', 'chicken', 'salmon'],
    // 사진 속 간식 자리 (원본 사진 기준 %, 가운데 x·y와 폭 w·높이 h)
    spots: {
      tuna: { x: 35.6, y: 50, w: 19, h: 28 },
      salmon: { x: 46.5, y: 56.5, w: 16.5, h: 28 },
      chicken: { x: 58.2, y: 60, w: 16.5, h: 27 },
    },
  },
  { rank: 2, name: '바삭·쫀득, 씹는 재미 박스', image: bestBox2, bg: 'var(--pastel-sand)', items: ['pollack', 'duck', 'crunch'],
    spots: {
      pollack: { x: 32, y: 60, w: 18, h: 27 },
      duck: { x: 45.4, y: 56, w: 18, h: 29 },
      crunch: { x: 59, y: 53.5, w: 16.5, h: 24 },
    },
  },
]

// S11 다른 집사들의 간식 세트 (운영자가 정한 예시 4개). tags: 종 · 나이 · 취향 (사진에 맞춘 예시값)
export const CAT_SETS = [
  { name: '참치·연어 듬뿍 세트', tags: ['코리안 숏헤어', '3살', '생선파'], image: catSet1, bg: 'var(--pastel-butter)', items: ['tuna', 'chicken', 'salmon'] },
  { name: '오독오독 씹는 맛 세트', tags: ['러시안 블루', '2살', '씹는 맛파'], image: catSet2, bg: 'var(--pastel-mint)', items: ['pollack', 'duck', 'crunch'] },
  { name: '생선에 바삭함 한 스푼', tags: ['브리티시 숏헤어', '7살', '바삭파'], image: catSet3, bg: 'var(--pastel-peach)', items: ['salmon', 'crunch', 'tuna'] },
  { name: '담백한 맛 모음 세트', tags: ['다묘 2마리', '4·5살', '담백파'], image: catSet4, bg: 'var(--pastel-mocha)', items: ['chicken', 'pollack', 'duck'] },
]

// 홈 첫 화면 아래 흐르는 띠 배너 문구 (사이트 정책에서 가져옴)
export const MARQUEE_ITEMS = ['매달 1회 정기배송', '신청하면 5% 할인', '6가지 수제간식', '30,000원 이상 무료배송', '입맛대로 골라 담기']
