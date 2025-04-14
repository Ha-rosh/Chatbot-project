import { useState } from 'react';

 export function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');
  
    // Mock responses (feel free to add more)
    const mockResponses = [
      "Hi there! 😊",
      "I'm just a mock bot. I can't think for myself... yet!",
      "That's interesting! Tell me more.",
      "What would you like to chat about?",
      "I'm here to help (kind of).",
      "Sorry, I'm just a pretend bot. No real AI here!"
    ];
  
    function saveInput(event) {
      setInputText(event.target.value);
    }
  
    function getRandomMockResponse() {
      const index = Math.floor(Math.random() * mockResponses.length);
      return mockResponses[index];
    }
  
    async function sendMessage() {
      if (!inputText.trim()) return;
      const userMessage = inputText.trim();
      setInputText('');
  
      // Add user message
      const newChatMessages = [
        ...chatMessages,
        {
          message: userMessage,
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
          message: '',
          isLoading: true,
          sender: 'robot',
          id: loadingMessageId,
        },
      ]);
  
      // Simulate delay and return mock response
      setTimeout(() => {
        const botMessage = getRandomMockResponse();
  
        setChatMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === loadingMessageId
              ? {
                  message: botMessage,
                  sender: 'robot',
                  id: loadingMessageId,
                }
              : msg
          )
        );
      }, 1000); // 1 second delay to mimic "thinking"
    }
  
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
  