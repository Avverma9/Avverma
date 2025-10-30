import React, { useState, useEffect } from 'react';

export default function ServerErrorPage() {
  const [traceId, setTraceId] = useState('');

  useEffect(() => {
    const mockId =
      Math.random().toString(16).substring(2, 10) +
      '-' +
      Math.random().toString(16).substring(2, 6);
    setTraceId(mockId);
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
      <div className="w-full max-w-lg mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center border border-gray-100">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
          Oops! Server Error
        </h1>
        <p className="text-xl font-medium text-red-600 mb-6">Error Code: 500</p>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          We seem to be experiencing an unexpected technical issue. Our team has been notified and is working to fix it.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <button
            onClick={handleRetry}
            className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
          <a
            href="/"
            className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300"
          >
            Go to Homepage
          </a>
        </div>

        <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-semibold text-gray-700 mb-2">What you can do:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Wait a few moments and then click "Try Again".</li>
            <li>If the problem persists, please contact our support team.</li>
          </ul>
          {traceId && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                If you contact support, please provide this reference ID:
                <strong className="block text-gray-600 mt-1 font-mono">{traceId}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
