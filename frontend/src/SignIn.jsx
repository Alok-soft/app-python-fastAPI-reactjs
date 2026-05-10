import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useAuth } from "./store/auth";

const API_URL = import.meta.env.VITE_API_URL;

// Reusable Input Style
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box"
};

function SignIn() {
  const navigate = useNavigate();  

  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { storeTokenInLS }  = useAuth();

  // const encryptedPassword = CryptoJS.SHA256(password).toString();

  // Toast State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    color: "#dc3545"
  });

  // Toast Function
  const showToast = (message, color = "#dc3545") => {
    setToast({
      show: true,
      message,
      color
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        color: "#dc3545"
      });
    }, 2500);
  };

  // Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Username Validation
    if (username.trim().length < 6) {
      showToast("Username is incorrect !");
      return;
    }

    // Password Validation
    if (password.trim() === "") {
      showToast("Please enter password");
      return;
    }

    const loginData = {
      username,
      password
      // password: encryptedPassword
    };

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        // Save Token (if backend sends token)
        if (data.access_token) {
          storeTokenInLS(data.access_token)          
        }

        showToast("Sign In Successful!", "#28a745");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        showToast(data.detail || "Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      showToast("Server Connection Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "0px" }}>
      {/* Toast */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: toast.color,
            color: "white",
            padding: "12px 18px",
            borderRadius: "8px",
            zIndex: 999
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px"
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h2>Welcome Home</h2>
        </Link>
      </nav>

      {/* Form Section */}
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f7fa"
        }}
      >
        <div
          style={{
            width: "380px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
            Sign In
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: loading ? "#999" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "14px"
            }}
          >
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;