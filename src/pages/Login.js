import { useState } from "react";
import { verifyPassword } from "../api";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Trigger exit animation
      setIsExiting(true);
      
      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const response = await verifyPassword(password);
      
      if (response.success) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        onLogin();
        navigate("/");
      } else {
        setError("Incorrect password");
        setIsExiting(false);
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
      setIsExiting(false);
    }
  };

  return (
    <div className={`login-container page-container ${isExiting ? 'page-exit' : 'page-enter'}`}>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Little Neha's Library</h2>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Database Password"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Access Library</button>
      </form>
    </div>
  );
};

export default Login;