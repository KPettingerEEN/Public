import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://logicaladmin.space');

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentTab, setCurrentTab] = useState('Current Chat');
  const username = localStorage.getItem('username');
  const organization = localStorage.getItem('organization');
  const room = `${organization}-${username}`;

  useEffect(() => {
    socket.emit('join', { username, room });

    socket.on('message', (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });

    return () => socket.disconnect();
  }, [room, username]);

  useEffect(() => {
    const fetchChatHistory = () => {
      try {
        const chatHistoryData = JSON.parse(localStorage.getItem('chatHistory')) || [];
        setChatHistory(chatHistoryData);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    const fetchContacts = () => {
      try {
        const contactsData = JSON.parse(localStorage.getItem('profiles')) || [];
        setContacts(contactsData.map(profile => profile.Username));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchChatHistory();
    fetchContacts();
  }, [organization]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { message, room, username });
      setMessage('');
    }
  };

  return (
    <div className="chat-modal">
      <div className="chat-nav">
        <button onClick={() => setCurrentTab('Current Chat')}>Channels</button>
        <button onClick={() => setCurrentTab('Chat History')}>Chats</button>
        <button onClick={() => setCurrentTab('Contacts')}>Contacts</button>
      </div>
      <div className="chat-content">
        {currentTab === 'Current Chat' && (
          <div className="current-chat">
            {chat.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.user === username ? 'my-message' : ''}`}>
                <strong>{msg.user}</strong>: {msg.text}
              </div>
            ))}
            <form onSubmit={sendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
        {currentTab === 'Chat History' && (
          <div className="current-chat">
            {chatHistory.map((chat, index) => (
              <div key={index} className="chat-message">
                <strong>{chat.username}</strong>: {chat.message} <em>({chat.timestamp})</em>
              </div>
            ))}
          </div>
        )}
        {currentTab === 'Contacts' && (
          <div className="current-chat">
            {contacts.map((contact, index) => (
              <div key={index} className="contact">
                {contact}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
