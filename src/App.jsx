import { useState } from 'react'
import { ChatMessages } from './component/ChatMessages';
import{ChatInput} from './component/ChatInput';
import './App.css'
 


function App (){
 
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <div className="chat-input-container">

      {chatMessages.length === 0 && (
        <p className="welcome-text">Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      )}
  
      <ChatMessages 
          chatMessages={chatMessages}
    />
    <ChatInput
      chatMessages={chatMessages}
      setChatMessages={setChatMessages} 
    /> 
  </div>
  );
}

export default App
