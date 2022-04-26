import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
       <li>
        <NavLink to="/" exact>Welcome Page</NavLink>
      </li>
      <li>
        <NavLink to="/allanimals" exact>Search Animals</NavLink>
      </li>
      <li>
        <NavLink to="/users" exact>All Users</NavLink>
      </li>
      <li>
        <NavLink to="/u1/mypets">My Pets</NavLink>
      </li>
      <li>
        <NavLink to="/pets/new">Add Pets</NavLink>
      </li>
      <li>
        <NavLink to="/authenticate">Authenticate</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
