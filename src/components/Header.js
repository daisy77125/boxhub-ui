import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ currentPath, toPath, displayName }) => {
  return (
    <li className="mx-1">
      <Link
        className={`nav-link ${currentPath === toPath ? "active" : ""}`}
        to={toPath}
      >
        {displayName}
      </Link>
    </li>
  );
};

const Header = () => {
  let location = useLocation();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Boxhub</span>
        <ul className="navbar-nav flex-row">
          <NavLink
            currentPath={location.pathname}
            toPath="/"
            displayName="Home"
          />
          <NavLink
            currentPath={location.pathname}
            toPath="/create"
            displayName="Create"
          />
        </ul>
      </div>
    </nav>
  );
};

export default Header;
