import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 터치 기기 전용 인터랙션 덮어쓰기 (docs/interaction.md). 다른 CSS보다 뒤에 오도록 마지막에 불러온다
import './styles/touch.css'
// 터치 기기 반응형 레이아웃 (데스크톱은 영향 없음)
import './styles/touch-layout.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
