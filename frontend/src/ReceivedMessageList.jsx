import "./App.css";
import Header from "./Header";
import ReceivedMessageCard from "./ReceivedMessageCard";
import {useNavigate} from "react-router";

function ReceivedMessageList() {
  const navigate=useNavigate();

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