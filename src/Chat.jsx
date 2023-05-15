import React, { useState,useEffect } from 'react';
import "./App.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { useToast } from '@chakra-ui/react'


function Chat({socket,username,room}) {

    useEffect(()=>{
        triggerToast();
    },[]);

    const [currentMessage,setCurrentMessage] = useState("");
    const [messageList, setmessageList] = useState([])

    const sendMessage = async ()=>{
        if(currentMessage!=="")
        {
            const messageData = {
                room : room,
                author : username,
                message : currentMessage,
                time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setmessageList((list)=>[...list,messageData])
            setCurrentMessage("");
        }
    }

    const toast = useToast();

    const triggerToast = () => {
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }

    useEffect(()=>{
        socket.on("self_message",(data)=>{
            setmessageList(data);
        })
        socket.on("receive_message",(data)=>{
            setmessageList((list)=>[...list,data])
        })


        return () => socket.removeListener('receive_message');
      },[socket])


  return (
    <div className='chat-window'>
    <div className="chat-header"> <p> Live Chat </p>
    </div>
    <div className="chat-body">
    <ScrollToBottom className='message-container' >
        {messageList.map((messageContent)=>{
            return (
                <div className="message" id={username===messageContent.author?"you" : "other"}>
                    <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id='time'>
                                {messageContent.time}
                            </p>
                            <p id='author'>
                                {messageContent.author}
                            </p>
                        </div>
                    </div>
                </div>
            )
        })}
        </ScrollToBottom>
    </div>
    <div className="chat-footer">
        <input onKeyDown={(e)=>{e.key==='Enter' && sendMessage()}} type="text" placeholder='Enter Message Here...' value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)}}/>
        <button onClick={sendMessage}>&#9658;</button>
    </div>
    </div>
  )
}

export default Chat;