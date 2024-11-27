import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Cadastro from './pages/home/Cadastro'
import Home from './pages/home/Home'
import Category from './components/category/Category'
import AuthGuard from './components/Login/AuthGuard' 
import Login from './components/Login/Login'

const page = createBrowserRouter([
  {
    path: '/kraken/',
    element: (
      <AuthGuard requireAuth={true}>
        <Home />
      </AuthGuard>
    ),
    children: [
      { path: 'categoria', element: <Category />}
    ]
  },
  { path: '/', element: <Login /> },
  { path: '/cadastro', element: <Cadastro /> },
  { path: "*", element: <div>404 - Página não encontrada</div> } 
])

export { page }