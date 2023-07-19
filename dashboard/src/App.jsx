import React,{useState} from "react";

import Login from "./Login";

import Dashboard from "./dashboard";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform the validation logic here (compare the entered PIN with the correct value)
    const enteredPIN = "1976"; // Replace with your predefined PIN
    if (enteredPIN === "1976") {
      setLoggedIn(true);
    } else {
      // Handle incorrect PIN, show an error message, etc.
    }
  };
  return (
    <div className="App">
      {!loggedIn ? <Login onLogin={handleLogin} /> : <Dashboard />}
    </div>
  );
}

export default App;
