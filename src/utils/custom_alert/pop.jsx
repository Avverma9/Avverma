// Popup.jsx
import React from "react";
import ReactDOM from "react-dom";

const Popup = ({ message, onClose }) => {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const boxStyle = {
    backgroundColor: "#ffffff",
    padding: "24px 32px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    minWidth: "320px",
    maxWidth: "90vw",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const messageStyle = {
    marginBottom: "24px",
    color: "#333",
    fontSize: "15px",
    whiteSpace: "pre-line",
    lineHeight: "1.5",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
  };

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <p style={messageStyle}>{message}</p>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export const popup = (message) => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  };

  ReactDOM.render(<Popup message={message} onClose={handleClose} />, div);
};
