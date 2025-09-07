import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toastConfig, setToastConfig] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const showToast = useCallback((message, options = {}) => {
        const { severity = 'info', duration = 3000 } = options;
        setToastConfig({ open: true, message, severity, duration });
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setToastConfig((prev) => ({ ...prev, open: false }));
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <Snackbar
                open={toastConfig.open}
                autoHideDuration={toastConfig.duration}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={toastConfig.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {toastConfig.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const showToast = useContext(ToastContext);
    if (!showToast) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return {
        success: (msg, opts = {}) => showToast(msg, { severity: 'success', ...opts }),
        error: (msg, opts = {}) => showToast(msg, { severity: 'error', ...opts }),
        info: (msg, opts = {}) => showToast(msg, { severity: 'info', ...opts }),
        warning: (msg, opts = {}) => showToast(msg, { severity: 'warning', ...opts }),
    };
}
