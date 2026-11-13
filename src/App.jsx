import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import BoxProvider from './components/BoxProvider'
import Home from './pages/Home'
import BoxBuilder from './pages/BoxBuilder'
import Subscribe from './pages/Subscribe'

// 페이지를 옮기면 맨 위부터 보이게
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <BoxProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/box" element={<BoxBuilder />} />
          <Route path="/subscribe" element={<Subscribe />} />
        </Routes>
      </BoxProvider>
    </BrowserRouter>
  )
}

export default App
