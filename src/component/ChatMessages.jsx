import{useRef, useEffect} from 'react';
import { ChatMessage } from './chatMessage';
/*
function useAutoScroll (dependencies) {
  const containerRef = useRef(null);

  useEffect(()=>{
    const containerElem = containerRef.current;
    if(containerElem){
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  },dependencies);

  return containerRef;
}
  const chatMessagesRef = useAutoScroll([chatMessages]);

*/
export function ChatMessages ({chatMessages}){

const chatMessagesRef = useRef(null);

useEffect(()=>{
  const containerElem = chatMessagesRef.current;
  if(containerElem){
     containerElem.scrollTop = containerElem.scrollHeight;
  }
},[chatMessages]);

return(
  <div
   className="chat-container"
   ref={chatMessagesRef}>
  
    {chatMessages.map((chatMessage)=>{
      return(
     <ChatMessage 
      message= {chatMessage.message}
      sender= {chatMessage.sender}
      key={chatMessage.id}
      />
     );

    })}
 </div>
);
}
