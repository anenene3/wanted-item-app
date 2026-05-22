import "./App.css";
import Header from "./Header";
import {useNavigate} from "react-router";

function ReceivedMessageDetail(props) {
  const navigate=useNavigate();

  return (
    <div className="received-message-detail">
      <Header />
      <h1>受信メッセージ詳細</h1>
      <div className="received-message-detail-contents">
        <div className="received-message-detail-item-name">{props.itemName}</div>

        <p>送信者名</p>
        <div className="received-message-detail-sender">{props.sender}</div>

        <p>メッセージ本文</p>
        <div className="received-message-detail-message-body">{props.messageBody}</div>

        <p>送信者の連絡先</p>
        <div className="received-message-detail-contact">{props.contact}</div>

        <p>受信日時</p>
        <div className="received-message-detail-date">{props.date}</div>

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