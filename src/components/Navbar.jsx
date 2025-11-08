import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

export default function Navbar() {
  const { user, setUser, logoutUser } = useAuthContext();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("Signout Successful");

        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold cursor-pointer">
          LOGO
        </Link>
      </div>
      <div className="flex gap-2">
        {user ? (
          <>
            <Link
              to="/auth/profile"
              className="tooltip tooltip-bottom hidden sm:inline-flex btn btn-primary btn-outline"
              data-tip={user.displayName}
            >
              Profile
            </Link>
            <Link className="btn btn-neutral" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth/signin" className="btn btn-outline btn-neutral">
              SignIn
            </Link>
            <Link to="/auth/signup" className="btn btn-outline btn-neutral">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
