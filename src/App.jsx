import { useState } from 'react'
import { ChatMessages } from './component/ChatMessages';
import{ChatInput} from './component/ChatInput';
import './App.css'
 


function App (){
  /*
  const [chatMessages, setChatMessages] = React.useState( [{ 
  message:"hello Chatbot" ,
  sender:'user' ,
  id:'id1'
 },
 {
  message:"Hello! How can i help you?" ,
  sender:'robot' ,
  id:'id2'
 },
 {
  message:"can you get me today date?" ,
  sender:'user' ,
  id:'id3'
 },
 {
  message:"Today is Semptember 27" ,
  sender:'robot' ,
  id:'id4'
 }]);
*/
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
