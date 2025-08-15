import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:1000/api/v1/fetch-messages",
        { withCredentials: true }
      );
      setMessages(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className=" min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">User Messages</h1>

      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500">No messages yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => setSelectedMessage(msg)}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {msg.name}
              </h2>
              <p className="text-sm text-gray-500">{msg.email}</p>
              <p className="mt-2 text-gray-700 line-clamp-2">{msg.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-11/12 md:w-1/2 relative animate-fadeIn">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {selectedMessage.name}
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {selectedMessage.email}
            </p>
            <p className="text-gray-700 whitespace-pre-wrap">
              {selectedMessage.message}
            </p>
            <p className="text-xs text-gray-400 mt-4">
              {new Date(selectedMessage.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
