import RobotProfile from '../assets/Chatbot Chat Message.jpg';
import UserProfile from '../assets/user-6380868_640 copy.png';


export function ChatMessage ({message, sender}){
  return (
    <div className={sender === 'user'? "profile-text-user" : "profile-text-robot"}>
      
       {sender === 'robot' &&  (
        <img src={RobotProfile} className="robot-image" />
      )} 
       <div  className= "message-text">
       {message }  
       </div>

       {sender === 'user' &&  ( 
        <img src={UserProfile} className="user-image" />
      )}
    </div>
  );
 }