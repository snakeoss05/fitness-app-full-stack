import React,{useState} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Settings from "./pages/settings";
import ClientCommands from "./pages/ClientCommands";
import User from "./pages/user";
import Historique from "./pages/Historique";
import ManageUser from "./pages/ManageUser";


export default function Dashboard() {

  
  return (
    <div>
     
      <BrowserRouter>
        <Navbar  />
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/Contact" element={<Historique />} />
          <Route path="/user" element={<User />} />
          <Route path="/dashboard" element={<ManageUser />} />
          <Route path="/" element={<ManageUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/client" element={<ClientCommands />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


