import React, { useState } from 'react';
import axios from 'axios';

import './Chatbot.css';

const Mascot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const chatWithGPT3 = async (userInput) => {
    const apiEndpoint = 'https://api.openai.com/v1/completions';
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    console.log(apiKey)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    const data = {
      model: 'gpt-3.5-turbo', // Update the model if needed
      prompt: userInput,
      max_tokens: 150
    };

    try {
      const response = await axios.post(apiEndpoint, data, { headers });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error communicating with the API:', error.message);
      return 'Sorry, an error occurred. Please try again later.'; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { text: input, user: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    const aiMessage = { text: '...', user: false };
    setMessages(prevMessages => [...prevMessages, aiMessage]);
    
    try {
      const response = await chatWithGPT3(input);
      const newAiMessage = { text: response, user: false };
      setMessages(prevMessages => [...prevMessages.slice(0, -1), newAiMessage]);
    } catch (error) {
      console.error('Error processing AI response:', error.message);
    }

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? 'user-message' : 'ai-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="chatbot-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Mascot;