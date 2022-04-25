import "./App.css";
import react from "react";
import { Route, Routes } from "react-router-dom";
// import Pets from "./pets/pages/Pets";
// import AllAnimals from "./pets/pages/AllAnimals";
// import UserList from "./admin/components/UserList";
import Users from "./admin/pages/Users";
import NewPets from "./pets/pages/NewPets";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPets from "./pets/pages/UserPets";
import WelcomePage from "./homepages/pages/WelcomePage";
import Homepage from "./homepages/pages/Homepage";
import UpdatePets from "./pets/pages/UpdatePets";
// import NavBar from "./shared/components/Navigation/NavBar";
// import { Container } from "react-bootstrap";
// import WelcomePage from "./homepages/pages/WelcomePage";
// import Homepage from "./homepages/pages/Homepage";
// import AllAnimals from "./pets/pages/AllAnimals";
// import AddingPets from "./admin/pages/AddingPets";

function App() {
  return (
    // <Container>
    // <NavBar />

    // {/* <Route path="/" element={<WelcomePage />} /> */}
    // {/* <Route path="/homepage" element={<Homepage />} /> */}
    // {/* <Route path="/addpets" element={<AddingPets />} /> */}
    //   {/* <Route path="/allpets" element={<AllAnimals />} /> */}
    //   {/* <Route path="/userprofile" element={<Users />} /> */}
    // </Container>
<div>
  <MainNavigation/>
  <main>
    <Routes>
    <Route path="/" element={<WelcomePage />}/>
    <Route path="/home" element={<Homepage />}/>
    


        <Route path="/users" element={<Users />}/>
        <Route path="/:userId/mypets" element={<UserPets />}/>
        <Route path="/pets/new" element={<NewPets />}/>
        <Route path="/pets/pet" element={<UpdatePets />}/>
        
       
   
    </Routes>
    </main>
    </div>
  );
}

export default App;
