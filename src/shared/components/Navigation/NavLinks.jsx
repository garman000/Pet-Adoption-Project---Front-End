import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import "./NavLinks.css";
// import logo from "../../images/logo.png"
const NavLinks = (props) => {
  const {isAdmin} = useContext(AuthContext);
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const navigateOut = () => {
    auth.logout();
    navigate("/")
  }

   return (
    <ul className="nav-links">
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/" exact>
            Welcome Page
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && !isAdmin && ( 
          <li>
          <NavLink to={`/myprofile/${auth.userId}`} >
            My Profile
          </NavLink>
        </li>
        )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/home" exact>
            Homepage
          </NavLink>
        </li>
      )}
     {auth.isLoggedIn && (
        <li>
          <NavLink to="/allanimals" exact>
            Search Animals
          </NavLink>
        </li>)}
  
      {isAdmin ? (
      <li>
        <NavLink to="/users" exact>
          All Users
        </NavLink>
      </li> ): "" }
  
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/mypets`}>My Pets</NavLink>
        </li>
      )}
      {auth.isLoggedIn && !isAdmin && (
        <li>
          <NavLink to={`/users/${auth.userId}`}>Update User</NavLink>
        </li>
      )}
       {isAdmin ? (
        <li>
          <NavLink to="/pet/new">Add Pets</NavLink>
        </li>
      ) : ""}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/authenticate">Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={navigateOut}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
