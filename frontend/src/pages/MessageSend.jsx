import "../App.css";
import Header from "../components/Header";
import {useNavigate} from "react-router";
import { useEffect, useState } from "react";

function MessageSend(props) {
  const navigate=useNavigate();

    useEffect(() => {
    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser || !loginUser.userId) {
      alert("ログインしてください");
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <div className="message-send">
      <Header />
      <h1>メッセージ送信</h1>

      <div className="message-send-contents">
        <div className="message-send-item-name">{props.name}</div>
        <div className="message-send-item-image">写真</div>

        <p>メッセージ本文</p>
        <textarea className="message-send-message"></textarea>

        <p>連絡先</p>
        <input className="message-send-address" />

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
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
}

export default MessageSend;