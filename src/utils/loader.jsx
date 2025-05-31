import React, { createContext, useContext, useState } from "react";
import Box from "@mui/material/Box";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 9999,
          }}
        >
          {/* Outer spinning ring */}
          <Box
            sx={{
              position: "relative",
              width: 130,
              height: 130,
              borderRadius: "50%",
              padding: "6px",
              boxSizing: "border-box",
              zIndex: 0,
            }}
          >
            {/* Spinning ring */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, #007bff, #00c6ff, #007bff, #00c6ff)",
                animation: "spin 1.8s linear infinite",
                filter: "drop-shadow(0 0 6px #00c6ff)",
                zIndex: 1,
              }}
            />

            {/* Inner white circle */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
                padding: "10px", // padding so logo doesn’t touch edges
                boxSizing: "border-box",
              }}
            >
              {/* Logo image (non-spinning) */}
              <img
                src="/logo.png"
                alt="Loading..."
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  boxShadow: "0 0 12px rgba(0,123,255,0.6)",
                  userSelect: "none",
                }}
              />
            </Box>
          </Box>

          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </Box>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  return useContext(LoaderContext);
};
