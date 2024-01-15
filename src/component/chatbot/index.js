// import React, { useState } from "react";
// // import { Configuration, OpenAIApi } from "openai";
// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {
//   MainContainer,
//   ChatContainer,
//   ConversationHeader,
//   Avatar,
//   MessageList,
//   Message,
//   MessageInput,
//   InfoButton,
// } from "@chatscope/chat-ui-kit-react";
// import { BsFillMicFill } from "react-icons/bs";

// export default function App() {
//   const [typing, setTyping] = useState(false);
//   const [messageInputValue, setMessageInputValue] = useState("");
//   const [messages, setMessages] = useState([
//     {
//       model: {
//         message: "Hello, I am Semedo",
//         sender: "Semedo",
//         direction: "incoming",
//         position: "normal",
//       },
//       avatar: <Avatar src={require("../../assest/download.png")} name="Zoe" />,
//     },
//   ]);

//   const startSpeechRecognition = () => {
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "id-ID";
  
//     recognition.onstart = () => {
//       console.log("Pengenalan suara dimulai...");
//       setTyping(true);
//     };
  
//     recognition.onresult = async (event) => {
//       const transcript = event.results[0][0].transcript;
//       console.log("Hasil pengenalan suara:", transcript);
  
//       // Tampilkan pesan dari pengenalan suara
//       const userMessage = {
//         model: {
//           message: transcript,
//           sender: "Pengguna",
//           direction: "outgoing",
//           position: "normal",
//         },
//         avatar: (
//           <Avatar
//             src={require("../../assest/download.png")}
//             name="Pengguna"
//           />
//         ),
//       };
  
//       setMessages((prevMessages) => [...prevMessages, userMessage]); // Menggunakan functional update
  
//       setMessageInputValue(transcript);
//       sendToChatbot((prevMessages) => [...prevMessages, userMessage]); // Menggunakan functional update untuk sendToChatbot
  
//       // Pindahkan pemanggilan sendToChatbot di sini agar tetap dijalankan bahkan jika terjadi kesalahan
//       try {
//         const response = await fetch("http://localhost:5000/chatbot", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ message: transcript }),
//         });
  
//         const data = await response.json();
//         console.log("Response from server:", data);
  
//         const chatbotMessage = {
//           model: {
//             message: data.response,
//             sender: "ChatBot",
//             direction: "incoming",
//             position: "normal",
//           },
//           avatar: (
//             <Avatar
//               src={require("../../assest/download.png")}
//               name="ChatBot"
//             />
//           ),
//         };
  
//         setMessages((prevMessages) => [...prevMessages, chatbotMessage]); // Menggunakan functional update
//       } catch (error) {
//         console.error("Error:", error);
//       }
  
//       setTyping(false);
//     };
  
//     recognition.onend = () => {
//       console.log("Pengenalan suara selesai.");
//     };
  
//     recognition.start();
//   };
  

//   const handleUserSendMessage = () => {
//     const userMessage = {
//       model: {
//         message: messageInputValue ,
//         sender: "Pengguna",
//         direction: "outgoing",
//         position: "normal",
//       },
//       avatar: (
//         <Avatar src={require("../../assest/download.png")} name="Pengguna" />
//       ),
//     };

//     setMessages([...messages, userMessage]);
//     setMessageInputValue("");
//     setTyping(true);
//     sendToChatbot([...messages, userMessage]);
//   };

//   const sendToChatbot = async (chatMsgs) => {
//     try {
//       const userMessage = chatMsgs[chatMsgs.length - 1].model.message; // Mendapatkan pesan terbaru dari pengguna
//       const response = await fetch("http://localhost:5000/chatbot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: userMessage }),
//       });

//       const data = await response.json();
//       console.log("Response from server:", data); // Tambahkan ini untuk memeriksa respons

//       const chatbotMessage = {
//         model: {
//           message: data.response, // Pastikan atribut ini sesuai dengan respons server
//           sender: "ChatBot",
//           direction: "incoming",
//           position: "normal",
//         },
//         avatar: (
//           <Avatar src={require("../../assest/download.png")} name="ChatBot" />
//         ),
//       };

//       setMessages([...chatMsgs, chatbotMessage]);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     setMessageInputValue("");
//   };

//   return (
//     <div
//       style={{
//         height: "600px",
//         position: "relative",
//         top: "100px",
//       }}
//     >
//       <MainContainer responsive>
//         <ChatContainer>
//           <ConversationHeader>
//             <ConversationHeader.Back />
//             <Avatar src={require("../../assest/download.png")} name="Zoe" />
//             <ConversationHeader.Content
//               userName="ChatBot"
//               info="Active 10 mins ago"
//             />
//             <ConversationHeader.Actions>
//               <InfoButton />
//             </ConversationHeader.Actions>
//           </ConversationHeader>
//           <MessageList>
//             {messages.map((message, index) => (
//               <Message
//                 key={index}
//                 model={message.model}
//                 avatar={message.avatar}
//               />
//             ))}
//           </MessageList>
//         </ChatContainer>
//       </MainContainer>
//       <div className="p-4 flex justify-between items-center w-full">
//         <div className="flex items-center w-full">
//           <button onClick={startSpeechRecognition} className="mr-2">
//             <BsFillMicFill />
//           </button>
//           <MessageInput
//             className="w-full"
//             placeholder="Type message here"
//             value={messageInputValue}
//             onChange={(val) => setMessageInputValue(val)}
//             onSend={handleUserSendMessage}
//             attachButton={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
  Avatar,
  MessageList,
  Message,
  MessageInput,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";
import { BsFillMicFill } from "react-icons/bs";

export default function App() {
  const [typing, setTyping] = useState(false);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [synthesizedSpeech, setSynthesizedSpeech] = useState("");

  useEffect(() => {
    if (synthesizedSpeech) {
      synthesizeSpeech(synthesizedSpeech);
    }
  }, [synthesizedSpeech]);

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "id-ID";

    recognition.onstart = () => {
      console.log("Pengenalan suara dimulai...");
      setTyping(true);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Hasil pengenalan suara:", transcript);

      const userMessage = {
        model: {
          message: transcript,
          sender: "Pengguna",
          direction: "outgoing",
          position: "normal",
        },
        avatar: (
          <Avatar
            src={require("../../assest/download.png")}
            name="Pengguna"
          />
        ),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessageInputValue(transcript);
      sendToChatbot([...messages, userMessage]);

      try {
        const response = await fetch("http://4.145.90.55:8000/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: transcript }),
        });

        const data = await response.json();
        console.log("Response from server:", data);

        const chatbotMessage = {
          model: {
            message: data.response,
            sender: "ChatBot",
            direction: "incoming",
            position: "normal",
          },
          avatar: (
            <Avatar
              src={require("../../assest/download.png")}
              name="ChatBot"
            />
          ),
        };

        setMessages((prevMessages) => [...prevMessages, chatbotMessage]);
        setMessageInputValue("");
        setTyping(true);
        setSynthesizedSpeech(data.response);
      } catch (error) {
        console.error("Error:", error);
      }

      setTyping(false);
    };

    recognition.onend = () => {
      console.log("Pengenalan suara selesai.");
    };

    recognition.start();
  };

  const synthesizeSpeech = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "id-ID";

    synth.speak(utterance);
  };

  const handleUserSendMessage = () => {
    const userMessage = {
      model: {
        message: messageInputValue,
        sender: "Pengguna",
        direction: "outgoing",
        position: "normal",
      },
      avatar: (
        <Avatar
          src={require("../../assest/download.png")}
          name="Pengguna"
        />
      ),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessageInputValue("");
    setTyping(true);
    sendToChatbot([...messages, userMessage]);
  };

  const sendToChatbot = async (chatMsgs) => {
    try {
      const userMessage = chatMsgs[chatMsgs.length - 1].model.message;
      const response = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      const chatbotMessage = {
        model: {
          message: data.response,
          sender: "ChatBot",
          direction: "incoming",
          position: "normal",
        },
        avatar: (
          <Avatar
            src={require("../../assest/download.png")}
            name="ChatBot"
          />
        ),
      };

      setMessages((prevMessages) => [...prevMessages, chatbotMessage]);
      setSynthesizedSpeech(data.response);
    } catch (error) {
      console.error("Error:", error);
    }
    setMessageInputValue("");
  };

  return (
    <div
      style={{
        height: "600px",
        position: "relative",
        // top: "100px",
      }}
    >
      <MainContainer responsive>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={require("../../assest/download.png")} name="Zoe" />
            <ConversationHeader.Content
              userName="ChatBot"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            {messages.map((message, index) => (
              <Message
                key={index}
                model={message.model}
                avatar={message.avatar}
              />
            ))}
          </MessageList>
        </ChatContainer>
      </MainContainer>
      <div className="p-4 flex justify-between items-center w-full">
        <div className="flex items-center w-full">
          <button onClick={startSpeechRecognition} className="mr-2">
            <BsFillMicFill />
          </button>
          <MessageInput
            className="w-full"
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={handleUserSendMessage}
            attachButton={false}
          />
        </div>
      </div>
    </div>
  );
}
