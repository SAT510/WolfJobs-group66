import { Navigate, useLocation } from "react-router-dom";
/**
 * ProtectedRoute is a component that ensures only authenticated users can access
 * the wrapped child components. If the user is not authenticated (i.e., no valid token is found in localStorage),
 * they are redirected to the login page.
 *
 * @param {Object} props - The props passed to the component.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {React.ReactNode} The children components if the user is authenticated, or redirects to the login page if not.
 */
const ProtectedRoute = ({ children }: any) => {
  // Retrieve the authentication token from localStorage
  const token: any = localStorage.getItem("token");
  // Get the current location to redirect after successful login
  let location = useLocation();
  // If no token is found, redirect to the login page 
  if (!!!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // If the token is found, render the children components
  return children;
};

export default ProtectedRoute;
