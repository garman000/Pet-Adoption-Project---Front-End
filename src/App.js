import "./App.css";
import react, { useCallback, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Users from "./admin/pages/Users";
import NewPets from "./pets/pages/NewPets";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPets from "./pets/pages/UserPets";
import WelcomePage from "./homepages/pages/WelcomePage";
import Homepage from "./homepages/pages/Homepage";
import AllAnimals from "./admin/pages/AllAnimals";
import Auth from "./admin/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import React from "react";
import UpdateUsers from "./admin/pages/UpdateUsers"
import MyProfile from "./homepages/pages/MyProfile";
import localforage from "localforage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false)
   const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false)

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    localforage.clear();
    navigate("/")
  }, []);

   let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/homepage" element={<Homepage />} />
        
        <Route path="/allanimals" element={<AllAnimals />} />
        <Route path="/:userId/mypets" element={<UserPets />} />
        <Route path="/pets/new" element={<NewPets />} />
       
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/allanimals" element={<AllAnimals />} />
        <Route path="/authenticate" element={<Auth />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout, isAdmin: isAdmin, setIsAdmin: setIsAdmin }}
    >
      <div>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/myprofile" element={<MyProfile />} />

            <Route path="/allanimals" element={<AllAnimals />} />

            <Route path="/users" element={<Users />} />
            <Route path="/:userId/mypets" element={<UserPets />} />
            <Route path="/users/:userId" element={<UpdateUsers />} />
            <Route path="/pets/new" element={<NewPets />} />
            <Route path="/authenticate" element={<Auth />} />

            {/* <Route path="/pets/:petId" element={<UpdatePets />}/> */}
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
