import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import styled from "styled-components";
import io from "socket.io-client";

const ChatRoom = () => {
  const { id, username } = useParams();
  const [messages, setMessages] = useState<{ text: string; isMyMessage: boolean }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContentRef = useRef<HTMLDivElement | null>(null);

  const socket = io("http://localhost:3001", {
    path: '/socket.io',
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  const roomId = `room-${id}-${username}`;

  const sendMessageToServer = (messageToSend: { text: string; isMyMessage: boolean; roomId: string }) => {
    socket.emit("message", messageToSend);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageToSend = { text: newMessage, isMyMessage: true, roomId: roomId };
      sendMessageToServer(messageToSend);

      setMessages((prevMessages) => [...prevMessages, messageToSend]);
      setNewMessage("");
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleReceivedMessage = (receivedMessage: { text: string; isMyMessage: boolean }) => {
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }

    socket.emit("join-room", roomId);

    socket.on("message", handleReceivedMessage);

    // 서버에서 초기 메시지를 가져오는 부분
    async function fetchInitialMessagesFromServer() {
      try {
        const response = await fetch('http://localhost:3001/initial-messages'); // 서버 주소에 맞게 수정
        if (!response.ok) {
          throw new Error('서버로부터 초기 메시지를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setMessages(data.initialMessages); // 서버에서 받은 초기 메시지를 상태에 설정
      } catch (error) {
        console.error('서버 요청 오류:', error);
      }
    }

    fetchInitialMessagesFromServer();
  }, [roomId]);

  return (
    <ChatRoomContainer>
      <Header />
      <h2>{id}님 과의 채팅방</h2>
      <ChatContentContainer>
        <ChatContent ref={chatContentRef}>
          {messages.map((message, index) => (
            <MessageBubble key={index} isMyMessage={message.isMyMessage}>
              {message.text}
            </MessageBubble>
          ))}
        </ChatContent>
      </ChatContentContainer>
      <ChatInputContainer>
        <ChatInput
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleInputKeyPress}
          placeholder="메시지 입력"
        />
        <ChatButton onClick={handleSendMessage}>전송</ChatButton>
      </ChatInputContainer>
    </ChatRoomContainer>
  );
};


const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChatContentContainer = styled.div`
  flex: 1;
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const ChatContent = styled.div`
  overflow-y: scroll;
  max-height: 710px;
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
`;

const MessageBubble = styled.div<{ isMyMessage: boolean }>`
  background: ${(props) => (props.isMyMessage ? "#0074e4" : "#e0e0e0")};
  color: ${(props) => (props.isMyMessage ? "#fff" : "#000")};
  border-radius: 12px;
  padding: 8px;
  margin: 4px;
  max-width: 70%;
  align-self: ${(props) => (props.isMyMessage ? "flex-end" : "flex-start")};
  word-wrap: break-word;
`;


const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 400px;
  width: 100%;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
`;

const ChatButton = styled.button`
  background: #0074e4;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
`;

export default ChatRoom;
