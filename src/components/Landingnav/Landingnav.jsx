import { NavLink, Outlet } from "react-router-dom";
import "./Landingnav.css";

function Landingnav() {
  return (
    <>
      <div className="navbar">
        <nav className="navLink">
          <NavLink className="link" to="/register">
            Register
          </NavLink>
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
export default Landingnav;
