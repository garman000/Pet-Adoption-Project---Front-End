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
import UpdatePet from "./admin/components/UpdatePet"
import { AuthContext } from "./shared/context/auth-context";
import React from "react";
import UpdateUsers from "./admin/pages/UpdateUsers"
import MyProfile from "./homepages/pages/MyProfile";
import localforage from "localforage";
import ShowPetsX from "./pets/pages/ShowPetsX";

function App({userInfo}) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)
   const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false)
  const [pet, setPet] = useState('')
  const [petId, setPetId] = useState(false)

  const login = useCallback((uid, token, expirationDate, isAdmin) => {
    // setIsLoggedIn(true);
    setToken(token)
    setUserId(uid);
    setIsAdmin(isAdmin)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        isAdmin,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  // useEffetct(() => {
  //   axios.get(`http://localhost:8080/token/${localforage.getItem('token')}`).then(res => console.log('res'))
  // }, [])

  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    setToken(null)
    setUserId(null);
    setIsAdmin(false)
    localforage.clear();
    navigate("/")
  }, []);

    const getPetId = useCallback((pid) => {
      setPetId(pid)
    })
    
   let routes;

  // if (isLoggedIn) {
    if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/homepage" element={<Homepage userInfo={userInfo} />} />
        
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
      value={{userInfo:userInfo, /*isLoggedIn: isLoggedIn,*/ token: token, isLoggedIn: !!token,  userId: userId, login: login, logout: logout, isAdmin: isAdmin, setIsAdmin: setIsAdmin, pet: pet, setPet: setPet, getPetId: getPetId, petId: petId }}
    >
      <div>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/myprofile/:userId" element={<MyProfile /> } />

            <Route path="/allanimals" element={<AllAnimals />} />

            <Route path="/users" element={<Users />} />
            <Route path="/:userId/mypets" element={<UserPets />} />
            <Route path="/users/:userId" element={<UpdateUsers />} />
            <Route path="/pet/new" element={<NewPets />} />
            <Route path="/pet/:petId" element={<UpdatePet />} />


            <Route path="/authenticate" element={<Auth />} />
            <Route path="/showpets" element={<ShowPetsX />} />

            {/* <Route path="/pets/:petId" element={<UpdatePets />}/> */}
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
