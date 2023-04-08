import React from "react";
import Navbar from "../src/components/pages/Navbar/Navbar.js";
import Home from "../src/components/pages/Home/Home.js";
import Login from "../src/components/pages/Login/Login.js";
import Register from "../src/components/pages/Register/Register.js";
import Maps from "../src/components/pages/Maps/Maps.js";
import Reservations from "../src/components/pages/Reservations/Reservations.js";
import { Route, Routes } from "react-router-dom";
import Particles from "../src/components/Particles.jsx";
function App() {
  return (
    <>
      <Particles />
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/map" element={<Maps />}></Route>
              <Route path="/reservations" element={<Reservations />}></Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
