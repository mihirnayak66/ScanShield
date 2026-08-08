import { useState, useEffect } from "react";
import axios from "axios";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import "./App.css";

axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/profile/",
        {
          withCredentials: true,
        }
      );

      setProfile(res.data);
      setLoggedIn(true);

      if (res.data.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setLoggedIn(false);
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:8000/api/login/"
      : "http://localhost:8000/api/register/";

    const data = isLogin
      ? { username, password }
      : { username, email, password };

    try {
      await axios.post(url, data, {
        withCredentials: true,
      });

      if (isLogin) {
        await fetchProfile();
      } else {
        alert("Registration Successful!");
        setIsLogin(true);
      }

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.detail || "Something went wrong!");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout/",
        {},
        {
          withCredentials: true,
        }
      );

      setLoggedIn(false);
      setProfile(null);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // DASHBOARDS
  // ======================

  if (loggedIn && profile) {
    return (
      <Routes>
        <Route
          path="/dashboard"
          element={
            <UserDashboard
              profile={profile}
              logout={logout}
            />
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <AdminDashboard
              profile={profile}
              logout={logout}
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={
                profile.role === "Admin"
                  ? "/admin-dashboard"
                  : "/dashboard"
              }
            />
          }
        />
      </Routes>
    );
  }

  // ======================
  // LOGIN / REGISTER
  // ======================

  return (
    <div className="container">
      <div className="card">
        <div className="logo">🛡️</div>

        <h1>Scaneshield</h1>

        <p className="subtitle">
          AI Powered Vulnerability Scanner
        </p>

        <h2>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          {!isLogin && (
            <input
              type="email"
              placeholder="📧 Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          )}

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            className="main-btn"
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <button
          className="switch-btn"
          onClick={() =>
            setIsLogin(!isLogin)
          }
        >
          {isLogin
            ? "Create New Account"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default App;