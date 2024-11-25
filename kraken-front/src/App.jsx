import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Cadastro from './pages/home/Cadastro'
import Home from './pages/home/Home'
import Category from './components/category/Category'

const page = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'categoria', element: <Category />},
      { path: 'cadastro', element: <Cadastro /> }
    ]
  },
  { path: "*", element: <div>404 - Página não encontrada</div> } 
])

export { page } 
