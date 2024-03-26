import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [userid, setUserId] = useLocalStorage("userid", null);
  const [username, setUsername] = useLocalStorage("username", null);
  const navigate = useNavigate();

  const login = async data => {
    setToken(data.token);
    setUserId(data.userid);
    setUsername(data.username);
    navigate("/garden");
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setUserId(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      userid,
      username,
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
