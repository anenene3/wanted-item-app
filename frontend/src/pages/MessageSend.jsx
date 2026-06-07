import "../App.css";
import Header from "../components/Header";
import {useNavigate, useParams} from "react-router";
import { useEffect, useState } from "react";



function MessageSend() {
  const navigate=useNavigate();

  const { itemId } = useParams();
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [itemName, setItemName] = useState("");


    useEffect(() => {
    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

      if (!loginUser || !loginUser.userId) {
        alert("ログインしてください");
        navigate("/login");
        return;
      }
      fetch(`http://localhost:8080/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setItemName(data.itemName);
      })
      .catch((error) => {
        console.error("商品情報取得エラー:", error);
        alert("商品情報の取得中にエラーが発生しました");
      });
    }, [itemId, navigate]);

    const handleSubmit = () => {

      const savedUser = localStorage.getItem("loginUser");
      const loginUser = savedUser ? JSON.parse(savedUser) : null;

      if (!loginUser || !loginUser.userId) {
        alert("ログインしてください");
        navigate("/login");
        return;
      }

       if (!message.trim()) {
        alert("メッセージを入力してください");
        return;
      }

       if (!contact.trim()) {
        alert("連絡先を入力してください");
        return;
      }

       fetch("http://localhost:8080/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          itemId: Number(itemId),
          senderUserId: loginUser.userId,
          messageBody: message,
          contact: contact
        })
      })
      .then((response) => response.text())
      .then((data) => {
        if (data === "送信成功") {
          alert("メッセージを送信しました");
          navigate(`/item-detail/${itemId}`);
          return;
        }

        alert(data);
      })
      .catch((error) => {
        console.error("投稿エラー:", error);
        alert("送信中にエラーが発生しました");
      });
    }
    




  return (
    <div className="message-send">
      <Header />
      <h1>メッセージ送信</h1>

      <div className="message-send-contents">
        <div className="message-send-item-name">{itemName}</div>
        <div className="message-send-item-image">写真</div>

        <p>メッセージ本文</p>
        <textarea 
          className="message-send-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
        </textarea>

        <p>連絡先</p>
        <input 
          className="message-send-address" 
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <div className="message-send-button-area">
          <input
            className="message-send-cancel-button"
            type="button"
            value="キャンセル"
            onClick={() => navigate(-1)}
          />
          <input
            className="message-send-send-button"
            type="button"
            value="送信"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default MessageSend;