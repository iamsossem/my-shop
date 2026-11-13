import { useEffect } from 'react'
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom'
import BoxProvider from './components/BoxProvider'
import Home from './pages/Home'
import BoxBuilder from './pages/BoxBuilder'
import Subscribe from './pages/Subscribe'
import Cart from './pages/Cart'
import useScrollReveal from './utils/useScrollReveal'
import PawCursor from './components/PawCursor'

// 페이지를 옮기면 맨 위부터 보이게
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ScrollReveal() {
  useScrollReveal()
  return null
}

// 모든 페이지 공통 틀. 페이지 전환 모션(View Transitions)은 링크의 viewTransition으로 켠다
function Layout() {
  return (
    <BoxProvider>
      <ScrollToTop />
      <ScrollReveal />
      <PawCursor />
      <Outlet />
    </BoxProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/box', element: <BoxBuilder /> },
      { path: '/cart', element: <Cart /> },
      { path: '/subscribe', element: <Subscribe /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
