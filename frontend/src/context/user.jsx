import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});
export function useUser() {
  return useContext(UserContext);
}
export function UserProvider({ children }) {
  const [UserLog, setUserLog] = useState(false);
  const navigate = useNavigate();
  function userState(state) {
    if (state === true) {
      navigate("/ProfileInformation");
      setUserLog(true);
    } else {
      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove("token");
      navigate("/login");
      setUserLog(false);
    }
  }
  var token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      setUserLog(true);
    }
  }, [token]);
  return (
    <UserContext.Provider
      value={{
        userState,
        UserLog,
      }}>
      {children}
    </UserContext.Provider>
  );
}
