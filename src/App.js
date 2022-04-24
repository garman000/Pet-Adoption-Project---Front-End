import "./App.css";
import react from "react";
import { Routes, Route } from "react-router-dom";
import Pets from "./pets/pages/Pets";
import UserList from "./admin/components/UserList";
import Users from "./admin/pages/Users";
import NavBar from "./shared/components/Navigation/NavBar";
import { Container } from "react-bootstrap";
import WelcomePage from "./admin/pages/WelcomePage";
import Homepage from "./admin/pages/Homepage";
import AllAnimals from "./pets/pages/AllAnimals";
import AddingPets from "./admin/pages/AddingPets";

function App() {
  return (
    <Container>
      <NavBar />
      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/addpets" element={<AddingPets />} />

        <Route path="/allpets" element={<AllAnimals />} />
        <Route path="/:userId/mypets" element={<Pets />}/>
        <Route path="/userprofile" element={<Users />} />
      </Routes>
    </Container>
  );
}

export default App;
