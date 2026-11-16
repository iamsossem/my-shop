import RollingText from './RollingText'
import { CoreButton } from './Buttons'
import { useBox } from './boxContext'
import { BOX_SLOTS } from '../data/snacks'
import { getPricing } from '../data/pricing'
import './TouchBuilderBar.css'

// 터치 기기 전용 박스 만들기 하단 고정 바 (docs/interaction.md #31 축소)
// 오른쪽 고정(sticky) 영역 대신 '○/8칸 · 합계 · 담기'만 화면 아래에 늘 보이게 한다.
// [data-fly-target]: 박스 칸이 화면 밖일 때 담기 모션(#25)이 날아오는 자리
export default function TouchBuilderBar({ barRef, onAdd }) {
  const { order, full } = useBox()
  return (
    <div ref={barRef} className="touch-bar" role="region" aria-label="내 박스 요약">
      <div className="touch-bar__info">
        <span className="touch-bar__count" data-fly-target>
          <strong>
            <RollingText text={order.length} />
          </strong>{' '}
          / {BOX_SLOTS}칸
        </span>
        <span className="touch-bar__total">
          합계 <RollingText text={getPricing(order).totalText} />
        </span>
      </div>
      <CoreButton type="button" onClick={onAdd} disabled={!full}>
        담기
      </CoreButton>
    </div>
  )
}
