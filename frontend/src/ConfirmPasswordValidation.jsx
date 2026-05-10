import React from "react";

function ConfirmPasswordValidation({
  password,
  confirmPassword,
  setConfirmPassword
}) {
  const isMatch =
    confirmPassword !== "" && password === confirmPassword;

  const isNotMatch =
    confirmPassword !== "" && password !== confirmPassword;

  return (
    <div style={{ position: "relative", marginBottom: "15px" }}>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: `1px solid ${
            isMatch ? "green" : isNotMatch ? "red" : "#ccc"
          }`,
          boxSizing: "border-box"
        }}
      />

      {/* Tick / Cross */}
      {isMatch && (
        <span
          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            color: "green",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          ✔
        </span>
      )}

      {isNotMatch && (
        <span
          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            color: "red",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          ✖
        </span>
      )}

      {/* Message */}
      {isMatch && (
        <div
          style={{
            color: "green",
            fontSize: "13px",
            marginTop: "5px"
          }}
        >
          Password matched
        </div>
      )}

      {isNotMatch && (
        <div
          style={{
            color: "red",
            fontSize: "13px",
            marginTop: "5px"
          }}
        >
          Password does not match
        </div>
      )}
    </div>
  );
}

export default ConfirmPasswordValidation;