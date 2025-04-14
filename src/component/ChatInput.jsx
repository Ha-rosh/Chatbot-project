import { useState } from 'react';
import SearchImage from '../assets/loading-spinner.gif';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInput(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (!inputText.trim()) return; // Prevent sending empty messages
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);

    // Show loading spinner
    const loadingMessageId = crypto.randomUUID();
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-image" src={SearchImage} alt="Loading..." />,
        sender: 'robot',
        id: loadingMessageId,
      },
    ]);
    /*
    try {
      // Call OpenAI API directly
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use environment variable
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful chatbot.' },
            ...newChatMessages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.message,
            })),
          ],
        }),
      });

      const data = await response.json();
      const botMessage = data.choices?.[0]?.message?.content || 'Sorry, I could not understand the response.';

      // Replace loading spinner with bot's response
      setChatMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessageId
            ? { message: botMessage, sender: 'robot', id: loadingMessageId }
            : msg
        )
      );
    } catch (error) {
      console.error('Error communicating with OpenAI API:', error.message);

      // Replace loading spinner with error message
      setChatMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessageId
            ? {
                message: 'Sorry, there was an error. Please try again later.',
                sender: 'robot',
                id: loadingMessageId,
              }
            : msg
        )
      );
    }
  }
 */

  export const callOpenAI = async (newChatMessages, setChatMessages, loadingMessageId) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // ✅ Updated
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful chatbot.' },
            ...newChatMessages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.message,
            })),
          ],
        }),
      });
  
      const data = await response.json();
  
      const botMessage =
        data.choices?.[0]?.message?.content || 'Sorry, I could not understand the response.';
  
      setChatMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessageId
            ? { message: botMessage, sender: 'robot', id: loadingMessageId }
            : msg
        )
      );
    } catch (error) {
      console.error('Error communicating with OpenAI API:', error.message);
  
      setChatMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessageId
            ? {
                message: 'Sorry, there was an error. Please try again later.',
                sender: 'robot',
                id: loadingMessageId,
              }
            : msg
        )
      );
    }
  };
  

  
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="input-container">
      <input
        className="inputMessage"
        placeholder="Send a message to Chatbot"
        size="30"
        value={inputText}
        onChange={saveInput}
        onKeyDown={handleKeyDown}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
  }

  