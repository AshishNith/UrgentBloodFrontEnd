"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

// Add donor data
const donors = [
  // ...your donors array...
];

// Add predefined responses
const PREDEFINED_RESPONSES = {
  greeting: [
    "Hello! I'm here to help you find blood donors. How can I assist you today?",
    "Hi! Need help finding blood donors? Just ask me about specific blood types or nearby donors.",
    "Welcome! I can help you locate blood donors. What type of blood are you looking for?"
  ],
  bloodTypes: {
    "A+": `We have ${donors.filter(d => d.bloodType === "A+").length} A+ donors available.`,
    "A-": `We have ${donors.filter(d => d.bloodType === "A-").length} A- donors available.`,
    "B+": `We have ${donors.filter(d => d.bloodType === "B+").length} B+ donors available.`,
    "B-": `We have ${donors.filter(d => d.bloodType === "B-").length} B- donors available.`,
    "O+": `We have ${donors.filter(d => d.bloodType === "O+").length} O+ donors available.`,
    "O-": `We have ${donors.filter(d => d.bloodType === "O-").length} O- donors available.`,
    "AB+": `We have ${donors.filter(d => d.bloodType === "AB+").length} AB+ donors available.`,
    "AB-": `We have ${donors.filter(d => d.bloodType === "AB-").length} AB- donors available.`,
  },
  nearbyDonors: (type: string) => {
    const matchingDonors = donors
      .filter(d => d.bloodType === type)
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      .slice(0, 3);
    
    return matchingDonors.length > 0
      ? `Nearest ${type} donors:\n${matchingDonors.map(d => 
          `${d.name} (${d.age}, ${d.gender}) - ${d.distance} away`
        ).join('\n')}`
      : `Sorry, no ${type} donors found nearby.`;
  },
  default: "I'm not sure about that. Try asking about specific blood types or nearby donors."
};

const getBotResponseFromInput = (input: string): string => {
  const lowerInput = input.toLowerCase();

  // Check for greetings
  if (lowerInput.match(/^(hi|hello|hey|greetings)/)) {
    return PREDEFINED_RESPONSES.greeting[Math.floor(Math.random() * PREDEFINED_RESPONSES.greeting.length)];
  }

  // Check for blood type queries
  const bloodTypeMatch = input.match(/(A|B|O|AB)[+-]/i);
  if (bloodTypeMatch) {
    const bloodType = bloodTypeMatch[0].toUpperCase();
    if (lowerInput.includes('nearby') || lowerInput.includes('close') || lowerInput.includes('near me')) {
      return PREDEFINED_RESPONSES.nearbyDonors(bloodType);
    }
    return PREDEFINED_RESPONSES.bloodTypes[bloodType] || PREDEFINED_RESPONSES.default;
  }

  // Check for general queries
  if (lowerInput.includes('donor')) {
    return `We have ${donors.length} total donors in our database. What blood type are you looking for?`;
  }

  if (lowerInput.includes('blood type') || lowerInput.includes('blood group')) {
    return "I can help you find donors for any blood type (A+, A-, B+, B-, O+, O-, AB+, AB-). Which one do you need?";
  }

  if (lowerInput.includes('emergency') || lowerInput.includes('urgent')) {
    return "For emergencies, I recommend checking O- donors as they are universal donors. Would you like me to find nearby O- donors?";
  }

  // Set of questions to ask the user
  const questions = [
    "What is your blood type?",
    "Are you looking for donors nearby?",
    "Do you need help with an emergency request?",
    "Would you like to know the total number of donors available?",
    "Is there a specific age range you are looking for in donors?"
  ];

  if (lowerInput.includes('questions')) {
    return `Here are some questions you can ask me:\n- ${questions.join('\n- ')}`;
  }

  return PREDEFINED_RESPONSES.default;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you with blood donation today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = async (userMessage: string): Promise<string> => {
    try {
      setIsTyping(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getBotResponseFromInput(userMessage);
    } catch (error) {
      console.error("Chat error:", error);
      return "I'm having trouble understanding. Please try asking about specific blood types or nearby donors.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      // Add user message
      const userMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputMessage("");
      setIsTyping(true);

      // Get bot response
      const botResponse = await getBotResponse(inputMessage);

      // Add bot message
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      // Display an error message to the user
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div>
      <div className="fixed bottom-4 right-4 w-16 h-16">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-0 bg-red-500 hover:bg-red-600 transition-colors rounded-full z-10 flex items-center justify-center shadow-lg group"
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <FaRobot size={24} className="text-white group-hover:scale-110 transition-transform" />
          </div>
        </button>
        {!isOpen && <div className="absolute w-full h-full animate-spin-slow">{/* CircularText component can be added here */}</div>}
      </div>

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
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-red-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none p-3">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
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