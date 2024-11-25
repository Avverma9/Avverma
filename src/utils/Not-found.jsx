import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const [isLoading, setIsLoading] = useState(true); // State to control the delay
    const navigate = useNavigate();

    // Simulate a 1-second delay before rendering the page
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // After 1 second, update the state to render the page
        }, 200);

        // Clean up the timeout in case the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    const goHome = () => {
        navigate(-1); // Go back to the previous page
    };

    const retryPage = () => {
        window.location.reload(); // Reload the current page
    };

    // Inline CSS styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        width: 'auto', // Full width of the screen
        padding: '20px',
        flexDirection: 'column', // Stack the content vertically
    };

    const contentStyle = {
        textAlign: 'center',
        width: 'auto',
        maxWidth: '600px', // Restrict the maximum width to 600px
        padding: '20px',
    };

    const headingStyle = {
        fontSize: '80px',
        fontWeight: 'bold',
        color: '#dc3545',
        marginBottom: '20px',
    };

    const subHeadingStyle = {
        fontSize: '32px',
        color: '#343a40',
        marginBottom: '20px',
    };

    const textStyle = {
        fontSize: '18px',
        color: '#6c757d',
        marginBottom: '30px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        margin: '10px', // Add space between the buttons
    };

    const goBackButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#28a745', // Green for 'Go Back'
    };

    const retryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#dc3545', // Red for 'Retry'
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    // Render a loading message or spinner while waiting for the delay
    if (isLoading) {
        return null;
    }

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <img
                    src="https://news.africa-business.com/assets/img/no-record-found.gif"
                    alt="404 gif"
                    style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }}
                />
                <h1 style={headingStyle}>404</h1>
                <h2 style={subHeadingStyle}>Page Not Found</h2>
                <p style={textStyle}>The page you are looking for does not exist or has been moved.</p>
                <div>
                    <button
                        onClick={goHome}
                        style={goBackButtonStyle}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = goBackButtonStyle.backgroundColor)}
                    >
                        Go Back
                    </button>
                    <button
                        onClick={retryPage}
                        style={retryButtonStyle}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = retryButtonStyle.backgroundColor)}
                    >
                        Retry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
