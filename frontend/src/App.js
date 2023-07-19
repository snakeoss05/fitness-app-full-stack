import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import {  Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import  {UserProvider} from "./context/user"
import Useraccount from "./pages/Useraccount";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
     
        <Route path="/ProfileInformation" element={<Useraccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
