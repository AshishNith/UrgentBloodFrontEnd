"use client"

import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you with blood donation today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('blood type') || lowerMessage.includes('blood group')) {
      return "We accept all blood types! The most common ones are A+, B+, O+, and AB+.";
    }
    if (lowerMessage.includes('donate') || lowerMessage.includes('donation')) {
      return "To donate blood, you must be at least 18 years old, weigh at least 50kg, and be in good health.";
    }
    if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return "You can find the nearest donation center using our map feature on the homepage.";
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hi! How can I assist you with blood donation today?";
    }
    return "I'm not sure about that. Would you like to know about blood donation requirements or find the nearest donation center?";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot thinking and respond
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-red-600 transition-colors z-50 flex items-center gap-2"
      >
        <FaRobot size={20} />
        {!isOpen && <span>Chat with us</span>}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl w-96 max-w-[calc(100vw-2rem)] z-50">
          {/* Chat Header */}
          <div className="bg-red-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="font-bold text-lg">Blood Donation Assistant</h2>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <FaTimes />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-red-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
