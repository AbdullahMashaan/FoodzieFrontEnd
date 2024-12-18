import "./App.css";
import { Navigate } from "react-router";
import { checkToken } from "./api/storage";
import Home from "./components/Home";

function App() {
  if (!checkToken()) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
