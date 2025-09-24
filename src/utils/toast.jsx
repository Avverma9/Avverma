import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toastConfig, setToastConfig] = useState({
    open: false,
    message: "",
    severity: "info",
    duration: 3000,
  });

  const showToast = useCallback((message, options = {}) => {
    const { severity = "info", duration = 3000 } = options;
    setToastConfig({ open: true, message, severity, duration });

    // auto close
    setTimeout(() => {
      setToastConfig((prev) => ({ ...prev, open: false }));
    }, duration);
  }, []);

  const severityColors = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <AnimatePresence>
          {toastConfig.open && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className={`px-4 py-2 rounded-lg shadow-lg ${severityColors[toastConfig.severity]}`}
            >
              {toastConfig.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToast = useContext(ToastContext);
  if (!showToast) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return {
    success: (msg, opts = {}) => showToast(msg, { severity: "success", ...opts }),
    error: (msg, opts = {}) => showToast(msg, { severity: "error", ...opts }),
    info: (msg, opts = {}) => showToast(msg, { severity: "info", ...opts }),
    warning: (msg, opts = {}) => showToast(msg, { severity: "warning", ...opts }),
  };
}
