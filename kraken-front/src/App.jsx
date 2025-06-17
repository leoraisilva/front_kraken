import './App.css';
import { createBrowserRouter, Outlet } from 'react-router-dom'; 
import Home from '../src/components/pages/Home';
import Menu from '../src/components/pages/Menu';
import Checking from "./components/body/checking/Checking";
import List from "./components/body/list/List";
import AuthGuard from '../src/components/login/AuthGuards';
import Register from "./components/body/register/Register";
import Setting from "./components/body/register/Setting";
import Login from '../src/components/login/Login';
import Store from './components/body/register/Store'
import RegisterCategory from './components/body/register/RegisterCategory';
import Comprar from './components/body/list/Comprar';
import Order from './components/body/pedido/Order';
import Historic from './components/body/historico/Historic';
import Cadastrar from './components/login/Cadastrar';

const ProtectedRoute = ({ children }) => {
  return (
    <AuthGuard requireAuth={true}>
      {children ? children : <Outlet />}
    </AuthGuard>
  );
};

const page = createBrowserRouter([
  {
    path: '/kraken/',
    element: <ProtectedRoute><Home /></ProtectedRoute>, 
    children: [
      { path: '', element: <ProtectedRoute><Menu /></ProtectedRoute> }, 
      { path: 'list', element: <ProtectedRoute><List /></ProtectedRoute> }, 
      { path: 'setting', element: <ProtectedRoute><Setting /></ProtectedRoute> },
      { path: 'checking', element: <ProtectedRoute><Checking /></ProtectedRoute> }, 
      { path: 'register', element: <ProtectedRoute><Register /></ProtectedRoute> },
      { path: 'registro-categoria', element: <ProtectedRoute><RegisterCategory /></ProtectedRoute> },
      { path: 'produto/:produto', element: <ProtectedRoute><Comprar /></ProtectedRoute> },
      { path: 'store', element: <ProtectedRoute><Store /></ProtectedRoute> },
      { path: 'order/:order', element: <ProtectedRoute><Order /></ProtectedRoute>},
      { path: 'historic', element: <ProtectedRoute><Historic /></ProtectedRoute>}
    ]
  },
  { path: '/', element: <Login /> },
  { path: '/cadastro', element: <Cadastrar /> },
  { path: '/register', element: <Setting /> }, 
  { path: "*", element: <div>404 - Página não encontrada</div> }
]);

export { page };