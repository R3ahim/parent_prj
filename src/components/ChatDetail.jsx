import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import RoundedBtn from "./Common/RoundedBtn";
import { messagesData } from "../data/whatsapp";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { cs1, cs2 } from "../assets/whatsapp";
import { getTime } from "../logic/whatsapp";

function ChatDetail() {
  const [messages, setMessages] = useState(messagesData);
  const [typing, setTyping] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://deltaorders.onrender.com/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data)

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Functions

  const addMessage = (msg) => {
    const newMessages = [...messages, msg];
    setMessages(newMessages);
  };

  const handleEmojiClick = () => {
    inputRef.current.value += "🔥";
    inputRef.current.focus();
  };

  const handleImgUpload = () => {
    addMessage({
      img: cs2,
      time: getTime(),
      sent: true,
    });
  };

  const handleInputChange = () => {
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  };

  const handleInputSubmit = () => {
    if (inputRef.current.value.length > 0) {
      addMessage({
        msg: inputRef.current.value,
        time: getTime(),
        sent: true,
      });
      inputRef.current.value = "";
      inputRef.current.focus();
      setTyping(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") handleInputSubmit();
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });


const handleDelete =(ider)=>{
  const id = ider;
        const datas = {id:id}
       
       const proceed = window.confirm('Are you sure?');
       
       if(proceed){
           const url = `https://deltaorders.onrender.com/orders/${id}`;
           console.log(url);
           fetch(url, {
               method: 'DELETE',
               headers: {
                   'content-type': 'application/json'
               },
               body:JSON.stringify(datas),
             
               
           })
           .then(res => res.json())
           .then(datas => {
               console.log(data);
               const remaining = data?.filter(service => service._id !== id);
               setData(remaining);
           })
       }

}


  return (
    // ChatDetail main container
    <div className="flex flex-col h-screen">
      {/* Contact nav */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        {/* Contact info */}
        <div className="flex items-center">
          {/* Profile picture */}
          <img
            src={"https://restaumatic-production.imgix.net/uploads/restaurants/275281/logo/1689151634.png?auto=compress%2Cformat&crop=focalpoint&fit=clip&h=500&w=500"}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />

          {/* Info */}
          <div className="flex flex-col">
            {/* Contact */}
            <h1 className="text-white font-medium">All Orders</h1>

            {/* Status */}
            {/* <p className="text-[#8796a1] text-xs">online</p> */}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      {/* Messages section */}
      <div
        ref={tableRef}
        className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain overflow-y-scroll h-100"
        style={{ padding: "12px 7%" ,overflowY: 'scroll',      }}
      >
        {data.map((msg) => (
          <Message
          msg={<div><span>Delta Kurzak: {msg.dKurzak} and {msg.dKurzakQ} piece</span><br /> <span> Kurzak:{msg.kurzak} and {msg.kurzakQ} peice</span><br /> <span>Delta Baranani :{msg.dBarani} and {msg.dBaraniQ}</span> <br /> <span> {msg.dBarani} and {msg.dBaraniQ}</span> <br /><span> Barani: {msg.barani} and {msg.baraniQ} peice</span><br /><span> Bulka{msg.bulkaQ}  peice</span><br /><span> frytura{msg.frytura} </span><br /><span> Delta Pita: {msg.pita1}peice</span><br /><span> Pita2: {msg.pita2}   peice </span><br /><span> tortila1{msg.tortila1}  peice</span><br /><span> Tortila2{msg.tortila2}  peice</span><br /><span> Majo:{msg.majo}  peice</span><br /><span> Sambal: {msg.sambal} peice</span><br /><span> Folia: {msg.folia}  peice</span><br /><span className="text-green-500"> <span className="text-blue-500">Comment</span>: {msg.comment}  </span>
        <br /><span>Majonez 76% : 8</span>  
          <br /><button style={{padding:'7px 10px', background:'red',borderRadius:'5px'}}onClick={() => handleDelete(msg._id)}  >Delete</button>
          </div>}
         
          email={msg.email}
          time={msg.time}
            
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Bottom section */}
      <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
        {/* Emoji btn */}
        <RoundedBtn icon={<BiHappy />} onClick={handleEmojiClick} />

        {/* Upload btn */}
        <span className="mr-2">
          <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} />
        </span>

        {/* Input bar */}
        <input
          type="text"
          placeholder="Type a message"
          className="bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
          onChange={handleInputChange}
          ref={inputRef}
        />

        {/* Mic/Send btn */}
        <span className="ml-2">
          {typing ? (
            <RoundedBtn icon={<MdSend />} onClick={handleInputSubmit} />
          ) : (
            <RoundedBtn icon={<BsFillMicFill />} />
          )}
        </span>
      </div>
    </div>
  );
}

export default ChatDetail;
