// Popup.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup = ({ message, onClose, delay = 6 }) => {
  const [countdown, setCountdown] = useState(delay);
  const [clickable, setClickable] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (countdown <= 0) {
      setClickable(true);
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // ESC key close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && clickable) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [clickable, onClose]);

  // Styles
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    fontFamily: "'Segoe UI', sans-serif",
  };

  const boxStyle = {
    backgroundColor: "#fff",
    padding: "24px 32px",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    minWidth: "320px",
    maxWidth: "90vw",
    animation: "fadeIn 0.3s ease-out",
  };

  const messageStyle = {
    marginBottom: "24px",
    color: "#333",
    fontSize: "15px",
    whiteSpace: "pre-line",
    lineHeight: "1.6",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: clickable ? "#4CAF50" : "#a5d6a7",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontWeight: "500",
    fontSize: "14px",
    cursor: clickable ? "pointer" : "not-allowed",
    transition: "background-color 0.3s",
  };

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <p style={messageStyle}>{message}</p>
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            onClick={clickable ? onClose : undefined}
            disabled={!clickable}
          >
            {clickable ? "OK" : `OK (${countdown}s)`}
          </button>
        </div>
      </div>
    </div>
  );
};

// Render Popup to DOM
export const popup = (message, onOkayCallback, delay = 6) => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
    if (onOkayCallback) onOkayCallback();
  };

  ReactDOM.render(
    <Popup message={message} onClose={handleClose} delay={delay} />,
    div
  );
};
