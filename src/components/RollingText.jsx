import './RollingText.css'

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// 숫자가 슬롯머신처럼 굴러가며 바뀌는 글자. 숫자 칸은 0~9 세로 띠를 올리고 내리고, 나머지 글자(쉼표·원 등)는 그대로.
// 오른쪽 끝부터 자리를 맞춰서 자릿수가 바뀌어도 같은 자리끼리 굴러간다
export default function RollingText({ text, className }) {
  const chars = [...String(text)]
  return (
    <span className={`rolling${className ? ` ${className}` : ''}`}>
      <span className="sr-only">{text}</span>
      {chars.map((ch, i) => {
        const key = chars.length - i
        const d = DIGITS.indexOf(ch)
        if (d < 0) {
          return (
            <span key={`c${key}`} className="rolling__char" aria-hidden="true">
              {ch}
            </span>
          )
        }
        return (
          <span key={`d${key}`} className="rolling__digit" aria-hidden="true">
            <span className="rolling__strip" style={{ transform: `translateY(${-d * 10}%)` }}>
              {DIGITS.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        )
      })}
    </span>
  )
}
