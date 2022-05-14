import React, { useContext, useEffect, useState } from "react";
import localforage from "localforage";
import { Container } from "react-bootstrap";

import AuthContext from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "../components/Homepage.css";

function Homepage(props) {
  const { setIsAdmin } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = auth.userId;
  const [showUsernName, setShowUsername] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await localforage.getItem("userInfo");

      try {
        const fetchNameOfUser = await sendRequest(
          `http://localhost:8080/users/${userId}`
        );
        setShowUsername(fetchNameOfUser.user.firstname);
        if (fetchNameOfUser) {
          setUserInfo(fetchNameOfUser);
          setIsAdmin(fetchNameOfUser.user.role === "admin");
          console.log("AdminTest", fetchNameOfUser.user.role);
        }
      } catch (err) {}
    };
    getUserInfo();
  }, [sendRequest, userId]);

  return (
    <Container>
      <div className="homepageIMG">
        <div className="test">
          <div className="display-4">
            {" "}
            Welcome {showUsernName}, this is your home
          </div>
          <div className="buttons">
            <Button to="/allanimals">Search</Button>
            <Button to={`/${auth.userId}/mypets`}>MyPets</Button>
            <Button to={`/myprofile/${auth.userId}`}>My Profile</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Homepage;
