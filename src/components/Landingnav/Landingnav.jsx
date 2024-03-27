import { NavLink, Outlet } from "react-router-dom";
import "./Landingnav.css";

function Landingnav() {
  return (
    <>
      <div className="landing-navbar">
        <nav className="landing-navLink">
          <NavLink className="landing-link" to="/register">
            Register
          </NavLink>
          <NavLink className="landing-link" to="/login">
            Login
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
export default Landingnav;
