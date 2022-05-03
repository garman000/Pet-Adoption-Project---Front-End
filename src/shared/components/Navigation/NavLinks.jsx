import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import "./NavLinks.css";
// import logo from "../../images/logo.png"
const NavLinks = (props) => {
  const auth = useContext(AuthContext);
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
      {auth.isLoggedIn && ( 
          <li>
          <NavLink to="/myprofile" >
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
     
        <li>
          <NavLink to="/allanimals" exact>
            Search Animals
          </NavLink>
        </li>
  
      {/* {auth.isAdmin && (  */}
      <li>
        <NavLink to="/users" exact>
          All Users
        </NavLink>
      </li>
      {/* } */}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/mypets`}>My Pets</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/users/${auth.userId}`}>Update User</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/pets/new">Add Pets</NavLink>
        </li>
      )}
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
