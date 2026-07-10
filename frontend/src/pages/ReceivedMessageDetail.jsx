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
    <>
      <Header />
      <div className="received-message-detail">
        <h1 className="received-message-detail-title">受信メッセージ詳細</h1>

        <div className="received-message-detail-contents">

          <section className="received-message-detail-item-card">
            <div className="received-message-detail-card-title">
              対象の商品
            </div>

            <div className="received-message-detail-item-card-contents">
              <div
                className={`received-message-detail-item-image ${
                  messageDetail.imagePath ? "has-image" : "no-image"
                }`}
              >
                {messageDetail.imagePath ? (
                  <img
                    className="received-message-detail-item-image-tag"
                    src={messageDetail.imagePath}
                    alt="商品画像"
                  />
                ) : (
                  <div className="received-message-detail-item-image-placeholder">
                    No Image
                  </div>
                )}
              </div>

              <div className="received-message-detail-item-info">
                <div className="received-message-detail-item-label">商品名</div>
                <div className="received-message-detail-item-name">
                  {messageDetail.itemName}
                </div>
              </div>
            </div>
          </section>

          <section className="received-message-detail-info-card">
            <div className="received-message-detail-card-title">
              送信者情報
            </div>

            <div className="received-message-detail-info-grid">
              <div className="received-message-detail-info-block">
                <div className="received-message-detail-label">送信者名</div>
                <div className="received-message-detail-value">
                  {messageDetail.senderUserName}
                </div>
              </div>

              <div className="received-message-detail-info-block">
                <div className="received-message-detail-label">受信日時</div>
                <div className="received-message-detail-value">
                  {formatDateTime(messageDetail.sentAt)}
                </div>
              </div>
            </div>

            <div className="received-message-detail-info-block">
              <div className="received-message-detail-label">送信者の連絡先</div>
              <div className="received-message-detail-contact">
                {messageDetail.contact}
              </div>
            </div>
          </section>

          <section className="received-message-detail-message-card">
            <div className="received-message-detail-card-title">
              メッセージ本文
            </div>

            <div className="received-message-detail-message-body">
              {messageDetail.messageBody}
            </div>
          </section>

          <div className="received-message-detail-button-area">
            <input
              className="received-message-detail-back-button"
              type="button"
              value="戻る"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    </>
  );

}

export default ReceivedMessageDetail;