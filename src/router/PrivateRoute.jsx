import Loading from "../components/Loading";
import useAuthContext from "../hooks/useAuthContext";
import { Navigate, useLocation } from "react-router";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth/signIn" state={location.pathname} />;
  }

  return children;
}
