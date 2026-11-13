import mark from '../assets/logo/golla-mark.svg'
import markReverse from '../assets/logo/golla-mark-reverse.svg'
import './Logo.css'

export default function Logo({ reverse = false, showEnglish = true }) {
  return (
    <span className={`logo${reverse ? ' logo--reverse' : ''}`}>
      <img className="logo__mark" src={reverse ? markReverse : mark} alt="" width="44" height="40" />
      <span className="logo__text">
        <span className="logo__ko">골라담냥</span>
        {showEnglish && <span className="logo__en">GOLLA DAMNYANG</span>}
      </span>
    </span>
  )
}
