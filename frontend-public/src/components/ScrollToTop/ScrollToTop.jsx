import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Desplazarse a la parte superior
  }, [location]);

  return null; // No necesitas renderizar nada
};

export default ScrollToTop;
