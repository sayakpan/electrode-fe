"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        severity: 'info',
        duration: 3000,
    });

    const openSnackbar = useCallback((message, severity = 'info', duration = 3000) => {
        setSnackbarState({
            open: true,
            message,
            severity,
            duration,
        });
    }, []);

    const closeSnackbar = useCallback(() => {
        setSnackbarState((prevState) => ({
            ...prevState,
            open: false,
        }));
    }, []);

    return (
        <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
            {children}
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={snackbarState.duration}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert variant="filled" onClose={closeSnackbar} severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};