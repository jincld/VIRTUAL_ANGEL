import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../frontend-public/AuthToken';

/**
 * Componente para proteger rutas según los roles de usuario permitidos.
 * @param {JSX.Element} element - El componente a renderizar si el usuario tiene acceso.
 * @param {string[]} allowedRoles - Lista de tipos de usuario permitidos (por ejemplo: ['admin', 'employee']).
 */
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { userType } = useAuth();

  // Si no está autenticado, redirige al login
  if (!userType) {
    return <Navigate to="/" replace />;
  }

  // Si el tipo de usuario no está en la lista de roles permitidos, redirige al login
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  // Si tiene permiso, renderiza el componente
  return element;
};

export default ProtectedRoute;
