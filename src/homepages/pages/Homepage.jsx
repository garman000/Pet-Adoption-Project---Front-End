import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../components/Homepage.css";
import { NavLink } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import AuthContext from "../../shared/context/auth-context";
import localforage from "localforage";
// import AuthContext from "../../context/auth-context";

function Homepage(props) {
  const { setIsAdmin } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await localforage.getItem("userInfo");
      if (user) {
        setUserInfo(user);
        setIsAdmin(user.role === "admin");
        console.log("AdminTest", user);
      } else {
        setUserInfo({});
      }
    };

    getUserInfo();
  }, [isLoggedIn]);

  return (
    <Container>
      <div className="homepageIMG">
        <div className="test">
          <div className="display-4">
            {" "}
            Welcome {userInfo.firstname}, this is your home
          </div>
        <div className="buttons">
          <Button to="/allanimals">Search</Button>
          <Button to={`/${auth.userId}/mypets`}>MyPets</Button>
          <Button>Settings</Button>
        </div>
        </div>
      </div>
    </Container>
  );
}

export default Homepage;
