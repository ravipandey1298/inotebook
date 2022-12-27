import React, { useEffect } from "react";
import {Link, useLocation} from "react-router-dom";


const Navbar = () => {

  // Use location is hook that help to find the location path details which url path is selected.
  const location = useLocation();
  useEffect(() => {
    // console.log(location.pathname)
  }, [location])
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* If Location path is "/" then the HOME should be active */}
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {/* If Location path is "/about" then the About should be active */}
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex">
          <Link className="btn btn-primary mx-1" to={"/login"} role="button">Login</Link>
          <Link className="btn btn-primary mx-1" to={"/signup"} role="button">Signup</Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
