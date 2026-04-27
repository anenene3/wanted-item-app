import "./App.css";

function ItemDetail(props) {
  return (
    <div className="item-detail">
      <h1>募集詳細</h1>

      <div className="item-detail-contents">
        <div className="item-detail-image">写真</div>

        <div className="item-detail-name">{props.name}</div>

        <div className="item-detail-price">{props.price}</div>

        <div className="item-detail-description">
          {props.description}
        </div>

        <input
          className="item-detail-button"
          type="submit"
          value="この募集に連絡する"
        />
      </div>
    </div>
  );
}

export default ItemDetail;