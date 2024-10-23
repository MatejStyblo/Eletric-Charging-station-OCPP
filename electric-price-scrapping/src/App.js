import React, { useEffect } from "react";
import "./App.css";
import MainPage from "./renderMainPage/MainPage";
import Login from "./Components/Login/login";
import { AuthProvider, useAuth } from "./AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BottomNav from "./Components/navbar/Navbar";
import ChargingCostSummary from "./ChargingCostSummary/ChargingCostSummary";
import Settings from "./Components/Settings/Settings"
import { Provider } from "react-redux"; // Redux Provider
import store from "./redux/store";

const AppContent = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !user) {
      login({ token });
    }

    if (user && location.pathname === "/login") {
      navigate("/");
    }
  }, [user, login, navigate, location.pathname]);

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user ? <MainPage /> : <Login />} />
        <Route path="/summary" element={<ChargingCostSummary />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      {user && <BottomNav />}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
