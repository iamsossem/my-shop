import './SnackShape.css'

// 시안의 간식 작은 도형 (도시락 칸, 구성품 썸네일에 사용)
export default function SnackShape({ id }) {
  return <span aria-hidden="true" className={`snack-shape snack-shape--${id}`} />
}
