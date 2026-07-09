import "../App.css";

function ReceivedMessageCard(props) {
  return (
    <div className="received-message-card">
      <div className="received-message-card-main">
        <div className="received-message-card-header">
          <div className="received-message-card-item-name">
            {props.itemName}
          </div>
        </div>

        <div className="received-message-card-sender">
          From: {props.sender}
        </div>

        <div className="received-message-card-message-preview">
          {props.messagePreview}
        </div>
      </div>

      <div className="received-message-card-side">
        <div className="received-message-card-date">{props.date}</div>

        <input
          className="received-message-card-detail-button"
          type="button"
          value="詳細"
          onClick={props.onClick}
        />
      </div>
    </div>
  );
}

export default ReceivedMessageCard;