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
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 160,
              height: 160,
            }}
          >
            {/* Stylish spinning gradient border */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, #007bff, #00c6ff, #007bff, #00c6ff)",
                animation: "spin 1.8s linear infinite",
                filter: "drop-shadow(0 0 6px #00c6ff)",
                zIndex: 0,
              }}
            />
            {/* Inner smaller white circle for spacing */}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                right: 8,
                bottom: 8,
                backgroundColor: "white",
                borderRadius: "50%",
                zIndex: 1,
                margin: "auto",
              }}
            />
            {/* Logo Image */}
            <img
              src="/logo.png"
              alt="Loading..."
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                right: 8,
                bottom: 8,
                margin: "auto",
                width: "128px",
                height: "128px",
                borderRadius: "50%",
                zIndex: 2,
                objectFit: "cover",
                boxShadow: "0 0 12px rgba(0,123,255,0.6)",
              }}
            />
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
