import "../App.css";
import Header from "../components/Header";
import ReceivedMessageCard from "../components/ReceivedMessageCard";
import {useNavigate} from "react-router";
import { useEffect, useState } from "react";

function ReceivedMessageList() {
  const navigate=useNavigate();
  const [messages, setMessages] = useState([]);
  
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

    useEffect(() => {
      const savedUser = localStorage.getItem("loginUser");
      const loginUser = savedUser ? JSON.parse(savedUser) : null;

      if (!loginUser || !loginUser.userId) {
        alert("ログインしてください");
        navigate("/login");
        return;
      }

      fetch(`http://localhost:8080/users/${loginUser.userId}/messages`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => {
        console.error("受信メッセージ一覧取得エラー:", error);
        alert("受信メッセージ一覧の取得中にエラーが発生しました");
    });
    }, [navigate]);

  return (
    <>
      <Header />    
      <div className="received-message-list">

        <h1 className="received-message-list-title">受信メッセージ一覧</h1>

        <div className="received-message-list-contents">
          {messages.length === 0 && (
            <div className="received-message-empty">
              受信メッセージはありません
            </div>
)}

          {messages.map((message) => (
            <ReceivedMessageCard
              key={message.messageId}
              itemName={message.itemName}
              sender={message.senderUserName}
              messagePreview={message.messageBody}
              date={formatDateTime(message.sentAt)}
              onClick={() => navigate(`/messages/detail/${message.messageId}`)}
            />
          ))}

        </div>
      </div>
    </>
  );
}

export default ReceivedMessageList;