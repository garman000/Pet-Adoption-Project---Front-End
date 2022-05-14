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
import UpdatePet from "./admin/components/UpdatePet";
import { AuthContext } from "./shared/context/auth-context";
import React from "react";
import UpdateUsers from "./admin/pages/UpdateUsers";
import MyProfile from "./homepages/pages/MyProfile";
import localforage from "localforage";
import Footer from "./shared/components/Navigation/Footer";
import ProtectedRoutes from "./shared/components/Navigation/ProtectedRoutes";

function App({ userInfo }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [pet, setPet] = useState("");
  const [petId, setPetId] = useState(false);

  localforage.getItem("token").then((res) => setToken(res));
  const login = useCallback((uid, token, expirationDate, isAdmin) => {
    setToken(token);
    setUserId(uid);
    setIsAdmin(isAdmin);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localforage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        isAdmin,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

   const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsAdmin(false);
    localforage.clear();
    navigate("/");
  }, []);

  const getPetId = useCallback((pid) => {
    setPetId(pid);
  });

 return (
    <AuthContext.Provider
      value={{
        userInfo: userInfo,
        token: token,
        isLoggedIn: !!token,
        userId: userId,
        login: login,
        logout: logout,
        isAdmin: isAdmin,
        setIsAdmin: setIsAdmin,
        pet: pet,
        setPet: setPet,
        getPetId: getPetId,
        petId: petId,
      }}
    >
      <div>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/myprofile/:userId" element={<ProtectedRoutes><MyProfile /></ProtectedRoutes>} />
            <Route path="/allanimals" element={<AllAnimals />} />
            <Route path="/users" element={<ProtectedRoutes><Users /></ProtectedRoutes>} />
            <Route path="/:userId/mypets" element={<ProtectedRoutes><UserPets /></ProtectedRoutes>} />
            <Route path="/users/:userId" element={<ProtectedRoutes><UpdateUsers /></ProtectedRoutes>} />
            <Route path="/pet/new" element={<ProtectedRoutes><NewPets /></ProtectedRoutes>} />
            <Route path="/pet/:petId" element={<ProtectedRoutes><UpdatePet /></ProtectedRoutes>} />
            <Route path="/authenticate" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
