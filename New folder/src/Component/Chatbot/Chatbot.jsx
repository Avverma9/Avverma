import React, { useState } from 'react';
import './Chatbot.css';

const ChatBox = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, user: true },
      ]);

      // Automatically send a reply from the chatbot
      let botReply = '';
      const userMessage = message.toLowerCase().trim();
      if (userMessage === 'hi' || userMessage === 'hello') {
        botReply = 'Hello! How can I assist you today?';
      } else if (userMessage.includes('book')) {
        botReply =
          'Sure! I can help you with booking hotels and tours. Please provide me with your preferred destination and dates.';
      } else if (userMessage.includes('hotel')) {
        botReply =
          'Great! To assist you better, please provide me with your preferred destination and dates for hotel booking.';
      } else if (userMessage.includes('tour')) {
        botReply =
          'Awesome! To assist you better, please provide me with your preferred destination and dates for tour booking.';
      } else if (userMessage.includes('thank you')) {
        botReply = 'You are welcome! If you have any more questions, feel free to ask.';
      } else if (userMessage.includes('help')) {
        botReply =
          'Of course! I can help you with hotel recommendations, tour information, and booking assistance. Just let me know what you need!';
      } else if (userMessage.includes('cancel')) {
        botReply =
          'I\'m sorry to hear that. Please provide me with your booking details, and I will assist you in canceling it.';
      } else if (userMessage.includes('availability')) {
        botReply =
          'To check hotel or tour availability, please provide me with your preferred destination and dates.';
      } else if (userMessage.includes('amenities')) {
        botReply =
          'Certainly! Our hotels offer a range of amenities, including swimming pools, fitness centers, and complimentary breakfast. Is there anything specific you would like to know?';
      } else if (userMessage.includes('payment')) {
        botReply =
          'We accept various payment methods, including credit cards and online transfers. Once you provide the necessary booking details, I can assist you with the payment process.';
      } else if (userMessage.includes('discount')) {
        botReply =
          'We offer various discounts and promotional offers throughout the year. Please provide me with your preferred dates and destination, and I can check if any discounts are available for you.';
      } else if (userMessage.includes('check-in')) {
        botReply =
          'The standard check-in time is usually in the afternoon, around 2 PM. However, early check-in may be possible depending on the availability and hotel policy. Please let me know your preferred hotel and dates, and I can check the options for you.';
      } else if (userMessage.includes('check-out')) {
        botReply =
          'The standard check-out time is usually in the morning, around 11 AM. Late check-out may be possible depending on the availability and hotel policy. Please let me know your preferred hotel and dates, and I can check the options for you.';
      } else if (userMessage.includes('cancellation policy')) {
        botReply =
          'Our cancellation policy varies depending on the hotel and tour package. Please provide me with your booking details, and I can provide you with the specific cancellation policy.';
      } else if (userMessage.includes('room types')) {
        botReply =
          'We offer a variety of room types, including standard rooms, suites, and deluxe rooms. Please let me know your preferred hotel and dates, and I can check the available room types for you.';
      } else if (userMessage.includes('wifi')) {
        botReply =
          'Yes, our hotels provide complimentary WiFi for all guests. You can enjoy high-speed internet access throughout your stay.';
      } else {
        botReply =
          'I apologize, but I am an AI chatbot and may not be able to provide a specific answer. Please contact our customer support for further assistance.';
      }

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botReply, user: false },
        ]);
      }, 500);

      setMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  return (
    <div className={`chat-container ${showChat ? 'chat-open' : ''}`}>
      {!showChat && (
        <div className="chat-icon" onClick={toggleChat}>
          <img
            src="https://uploads-ssl.webflow.com/5c99a2b7f7d06d83b8d7d285/5cb9655e16ec99109bf1780a_Ava%20Wave%20wink%20welcome%20to%20button.gif"
            alt="Chat Icon"
          />
        </div>
      )}
      {showChat && (
        <div className="chat-window">
          <div className="chat-header">
            <button className="close-btn" onClick={toggleChat}>
              &times;
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.user ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleMessageSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
