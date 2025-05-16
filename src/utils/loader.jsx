// utils/loader.js
import React, { createContext, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import loaderImage from '../assets/loader.gif'; // Adjust the path as necessary

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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust transparency as needed
                        zIndex: 9999,
                    }}
                >
                    <img
                        src={loaderImage} // Using the imported loader image
                        alt="Loading..."
                        style={{
                            maxWidth: '60%', // Limit the width to 80% of the container
                            maxHeight: '60%', // Limit the height to 80% of the container
                        }} // Adjust size as needed
                    />
                </Box>
            )}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    return useContext(LoaderContext);
};
