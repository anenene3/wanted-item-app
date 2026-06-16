import "../App.css";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function ReceivedMessageDetail() {
  const navigate=useNavigate();
  const { messageId } = useParams();
  const [messageDetail, setMessageDetail] = useState(null);

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

      fetch(`http://localhost:8080/messages/${messageId}`)
      .then((response) => response.json())
      .then((data) => setMessageDetail(data))
      .catch((error) => {
          console.error("受信メッセージ詳細取得エラー:", error);
          alert("受信メッセージ詳細の取得中にエラーが発生しました");
      });
    }, [messageId, navigate]);

    if (!messageDetail) {
      return <div>読み込み中...</div>;
    }


  return (
    <div className="received-message-detail">
      <Header />
      <h1>受信メッセージ詳細</h1>
      <div className="received-message-detail-contents">
        <div className="received-message-detail-item-name">{messageDetail.itemName}</div>

        <p>送信者名</p>
        <div className="received-message-detail-sender">{messageDetail.senderUserName}</div>

        <p>メッセージ本文</p>
        <div className="received-message-detail-message-body">{messageDetail.messageBody}</div>

        <p>送信者の連絡先</p>
        <div className="received-message-detail-contact">{messageDetail.contact}</div>

        <p>受信日時</p>
        <div className="received-message-detail-date">{formatDateTime(messageDetail.sentAt)}</div>

        <input
          className="received-message-detail-back-button"
          type="button"
          value="戻る"
          onClick={()=>navigate(-1)}
        />
      </div>
    </div>
  );
}

export default ReceivedMessageDetail;