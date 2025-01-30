import './App.css';
import { createBrowserRouter, Outlet } from 'react-router-dom'; 
import Home from '../src/components/pages/Home';
import Menu from '../src/components/pages/Menu';
import Checking from "../src/components/body/Checking";
import List from "../src/components/body/List";
import AuthGuard from '../src/components/login/AuthGuards';
import Register from "../src/components/body/Register";
import Setting from "../src/components/body/Setting";
import Login from '../src/components/login/Login';

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
      { path: 'register', element: <ProtectedRoute><Register /></ProtectedRoute> } 
    ]
  },
  { path: '/', element: <Login /> },
  { path: '/register', element: <Setting /> }, 
  { path: "*", element: <div>404 - Página não encontrada</div> }
]);

export { page };