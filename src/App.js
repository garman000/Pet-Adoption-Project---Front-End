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

function App() {
  return (
    <Container>
      <NavBar />
      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/homepage" element={<Homepage />} />

        <Route path="/mypets" element={<Pets />} />
        <Route path="/userprofile" element={<Users />} />
      </Routes>
    </Container>
  );
}

export default App;
