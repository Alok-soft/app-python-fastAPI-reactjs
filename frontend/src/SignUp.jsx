import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordValidation from "./PasswordValidation.jsx";
import ConfirmPasswordValidation from "./ConfirmPasswordValidation.jsx";

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

function SignUp() {
  const navigate = useNavigate();

  const [fname, setFirstname] = useState("");
  const [mname, setMiddlename] = useState("");
  const [lname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileno] = useState("");

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    color: "#28a745"
  });

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
        color: "#28a745"
      });
    }, 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (fname.trim().length < 3) {
      showToast("Enter valid First Name");
      return;
    }

    if (mname.trim() !== "" && mname.trim().length < 3) {
      showToast("Enter valid Middle Name");
      return;
    }

    if (lname.trim().length < 3) {
      showToast("Enter valid Last Name");
      return;
    }

    if (username.trim().length < 6) {
      showToast("Username must be at least 6 characters");
      return;
    }

    if (password.trim() === "") {
      showToast("Please Enter Password");
      return;
    }

    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
      )
    ) {
      showToast("Weak Password");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match");
      return;
    }

    if (!email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showToast("Invalid Email");
      return;
    }

    if (!mobileNo.trim().match(/^[6-9]\d{9}$/)) {
      showToast("Invalid Mobile Number");
      return;
    }

    const userData = {
      fname,
      mname,
      lname,
      username,
      password,
      email_id: email,
      mobile_no: mobileNo
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Signup Successful!", "#28a745");

        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } else {
        showToast(data.detail || "Signup Failed");
      }
    } catch (error) {
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
            // top: "20px",
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

      {/* Form */}
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f7fa"
        }}
      >
        <div
          style={{
            width: "380px",
            padding: "0px 30px 30px 30px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
            Sign Up
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFirstname(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Middle Name"
              value={mname}
              onChange={(e) => setMiddlename(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLastname(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />

            <PasswordValidation
              password={password}
              setPassword={setPassword}
            />

            <ConfirmPasswordValidation
              password={password}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />

            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileno(e.target.value)}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: loading ? "#999" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "14px"
            }}
          >
            Already have an account?{" "}
            <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;