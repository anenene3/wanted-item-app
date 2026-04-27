import "./App.css";

function MessageSend(props) {
  return (
    <div className="message-send">
      <h1>メッセージ送信</h1>

      <div className="message-send-contents">
        <div className="message-send-item-name">{props.name}</div>
        <div className="message-send-item-image">写真</div>

        <p>メッセージ本文</p>
        <textarea className="message-send-message"></textarea>

        <p>連絡先</p>
        <input className="message-send-address" />

        <input
          className="message-send-cancel-button"
          type="button"
          value="キャンセル"
        />
        <input
          className="message-send-send-button"
          type="button"
          value="送信"
        />
      </div>
    </div>
  );
}

export default MessageSend;