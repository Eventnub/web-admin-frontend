import { Navigate } from 'react-router-dom';

export default function HomePage() {
  const shouldRedirect = true;

  return <>{shouldRedirect && <Navigate replace to="/auth" />}</>;
}
