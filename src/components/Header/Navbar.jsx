import { NavLink, Outlet } from "react-router-dom";
// import { useAuth } from "";
import "./navbar.css";

function Navbar() {
  // const { logout } = useAuth;
  // const handleLogout = () => {
  //   logout();
  //   navigate("/");
  // };
  return (
    <>
      <div className="navbar">
        <div className="logo-container">
          <NavLink to="/">
            <img className="logo" src="src/assets/logo-header.png" />
          </NavLink>
        </div>
        <nav className="navLink">
          <NavLink className="link" to="/garden">
            Garden
          </NavLink>
          <NavLink className="link" to="/calendar">
            Calendar
          </NavLink>
          <NavLink className="link" to="/kitchen">
            Kitchen
          </NavLink>
          {/* <NavLink className="link" to="/" onClick={handleLogout}>
            LogOut
          </NavLink> */}
        </nav>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
