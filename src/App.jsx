import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>
        <span>🛒</span> The Shop <span>🛒</span>
      </h1>

      <p>Welcome to TheShop</p>

      <button
        className="button-start-shopping"
        onClick={() => navigate("/home")}
      >
        Get Started
      </button>
    </div>
  );
}

export default App;