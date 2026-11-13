import './SectionTitle.css'

// 섹션 제목 줄: 영문 라벨 + 섹션 제목 + 오른쪽 링크/표시. center면 가운데 정렬 + 설명 한 줄
export default function SectionTitle({ eyebrow, title, right, center = false, desc, id }) {
  return (
    <div className={`section-title${center ? ' section-title--center' : ''}`}>
      <div className="section-title__head">
        <span className="section-title__eyebrow">{eyebrow}</span>
        <h2 className="section-title__title" id={id}>
          {title}
        </h2>
        {desc && <p className="section-title__desc">{desc}</p>}
      </div>
      {right && <div className="section-title__right">{right}</div>}
    </div>
  )
}
