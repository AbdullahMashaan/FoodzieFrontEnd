import { jwtDecode } from "jwt-decode";
const checkToken = () => {
    const token = getToken();
    if (token && token !== "undefined" && token !== null && token !== undefined) {

      const decode = jwtDecode(token);
      const cureentTime = Date.now() / 1000;
      if (decode.exp < cureentTime) {
        deleteToken();
        return false;
      }
      return true;
    }
    return false;
  };

const setToken = (token) => {
    localStorage.setItem("token", token);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  export {getToken, checkToken, deleteToken, setToken };