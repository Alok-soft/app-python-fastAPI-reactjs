import React, { useState } from "react";

function PasswordValidation({ password, setPassword }) {
  const [showRules, setShowRules] = useState(false);

  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@$!%*?&]/.test(password)
  };

  const color = (ok) => ({
    color: ok ? "green" : "red",
    fontSize: "13px",
    marginBottom: "4px"
  });

  return (
    <div style={{ position: "relative" }}>
      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setShowRules(true)}
        onBlur={() => setShowRules(false)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxSizing: "border-box"
        }}
      />

      {showRules && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "8px",
            background: "#fff",
            marginBottom: "15px"
          }}
        >
          <div style={color(rules.length)}>✔ Minimum 8 characters</div>
          <div style={color(rules.upper)}>✔ At least 1 uppercase</div>
          <div style={color(rules.lower)}>✔ At least 1 lowercase</div>
          <div style={color(rules.number)}>✔ At least 1 number</div>
          <div style={color(rules.special)}>✔ At least 1 special character</div>
        </div>
      )}
    </div>
  );
}

export default PasswordValidation;