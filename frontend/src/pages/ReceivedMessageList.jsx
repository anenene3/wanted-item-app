import "../App.css";
import Header from "../components/Header";
import ReceivedMessageCard from "../components/ReceivedMessageCard";
import {useNavigate} from "react-router";
import { useEffect, useState } from "react";

function ReceivedMessageList() {
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
    <div className="received-message-list">
      <Header />
      <h1>受信メッセージ一覧</h1>

      <div className="received-message-list-contents">
        <ReceivedMessageCard
          itemName="ゲームソフトA"
          sender="yamakazu"
          messagePreview="はじめまして。こちらの商品について..."
          date="2026/04/28 10:44"
          onClick={() => navigate("/messages/detail")}
        />
        <ReceivedMessageCard
          itemName="ゲームソフトB"
          sender="yamakazu"
          messagePreview="はじめまして。こちらの商品について..."
          date="2026/04/28 10:45"
          onClick={() => navigate("/messages/detail")}
        />
      </div>
    </div>
  );
}

export default ReceivedMessageList;