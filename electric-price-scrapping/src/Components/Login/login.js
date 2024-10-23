import React, { useState } from "react";
import { useAuth } from "../../AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import loginImage from "./../../img/skodaeniayAI.png";
import { BsLightningChargeFill, BsFillLockFill } from "react-icons/bs";
import "./login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Stav pro chybovou zprávu

  const { login } = useAuth(); // Získejte funkci login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { token, userId } = data; // Předpokládáme, že server vrací token a userId

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId); // Uložení userId do localStorage
      
      login(data);
      navigate("/"); // Přesměrování na domovskou stránku
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Špatné uživatelské jméno nebo heslo.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <img
        src={loginImage}
        alt="Chytré Nabíjení auta"
        className="login-form-image"
      />
      <h1 className="login-form-title">Chytré Nabíjení auta</h1>
      <div className="login-input-container">
        <label htmlFor="username">Uživatelské jméno</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Uživatelské jméno"
          className="login-form-input login-form-input-username"
        />
        <span>
          <i className="icon">
            <BsLightningChargeFill />
          </i>
        </span>
      </div>
      <div className="login-input-container">
        <label htmlFor="password">Heslo</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Heslo"
          className="login-form-input login-form-input-password"
        />
        <span>
          <i className="icon">
            <BsFillLockFill />
          </i>
        </span>
      </div>

      <button type="submit" className="login-form-button">
        Přihlásit se
      </button>
      {errorMessage && <div className="login-error-banner">{errorMessage}</div>}
    </form>
  );
};

export default Login;
