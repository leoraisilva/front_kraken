import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children, requireAuth = true }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default AuthGuard;