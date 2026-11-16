import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages(https://iamsossem.github.io/my-shop/)는 저장소 이름 경로 아래에서 열리므로
// 빌드할 때만 base를 '/my-shop/'으로 둔다. 개발 서버는 그대로 '/'에서 열린다
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/my-shop/' : '/',
  plugins: [react()],
}))
