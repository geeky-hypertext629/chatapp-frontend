import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import Chat from './Chat';
import "./App.css";

const socket = io.connect('https://chatapp2-lk2w.onrender.com');

function App() {

  const [username, setusername] = useState("");
  const [room, setRoom] = useState("");
  const [userJoined, setUserJoined] = useState(false);

  const joinUser = () => {
    if (room !== "" && username !== "") {
      socket.emit('join_room', { username, room });
      setUserJoined(true);
    }
  }



  return (
    !userJoined ? (

      <div className="login-box">
        <h2>Join A Chat</h2>
        <form>
          <div class="user-box">
            <input type="text" placeholder='Enter Your Name' onChange={(e) => {
              setusername(e.target.value);
            }} value={username} />
            <label>Enter Your Name</label>
          </div>
          <div class="user-box">
            <input type="text" placeholder='Enter room id' value={room} onChange={(e) => {
              setRoom(e.target.value);
            }} />
            <label>Room Id</label>
          </div>
          <button onClick={joinUser} >
            {/* <button > */}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Join
            {/* </button> */}
          </button>
        </form>
      </div>
    )


    //   <div className='App'>
    //   <div className="joinChatContainer">
    //   <h3>Join A chat</h3>
    //     <input type="text" placeholder='Enter Your Name' onChange={(e) => {
    //       setusername(e.target.value);
    //     }} value={username} />
    //     <br />
    //     <input type="text" placeholder='Enter room id' value={room} onChange={(e) => {
    //       setRoom(e.target.value);
    //     }} /> <br />
    //     <button onClick={joinUser}>Submit</button>
    //     </div>
    //   </div>
    // ) 
      // <div className="joinChatContainer">
      //   <h3>Join A Chat</h3>
      //   <input
      //     type="text"
      //     placeholder="John..."
      //     onChange={(event) => {
      //       setusername(event.target.value);
      //     }}
      //   />
      //   <input
      //     type="text"
      //     placeholder="Room ID..."
      //     onChange={(event) => {
      //       setRoom(event.target.value);
      //     }}
      //   />
      //   <button onClick={joinUser}>Join A Room</button>
      // </div>)
    
    : (
      <div>
        <Chat socket={socket} username={username} room={room} />
      </div>)

  )
}

export default App;
