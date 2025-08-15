import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import axios from "axios";

const AiChatboat = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I’m your health assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [OPENROUTER_API_KEY, setkey] = useState("");
  useEffect(() => {
    const fetchKey = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-openRouter-key",
        { withCredentials: true }
      );
      setkey(res.data.key);
    };

    fetchKey();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI health assistant. Give safe, general health guidance and suggest users consult doctors for serious issues.",
            },
            ...messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botText = response.data.choices[0].message.content;
      const botMessage = { sender: "bot", text: botText };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-blue-100">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
        <FaRobot /> AI Health Chatbot
      </h2>

      <div className="h-96 overflow-y-auto border p-4 rounded-lg mb-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-xs px-4 py-2 rounded-lg shadow bg-gray-200 text-gray-800 animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2 focus:outline-blue-400"
          placeholder="Ask a health question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSend}
        >
          <IoSend className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default AiChatboat;
