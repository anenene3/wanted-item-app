import "./App.css";
import Header from "./Header";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function ItemDetail(props) {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error("詳細データ取得エラー:", error));
  }, [itemId]);

  if (!item) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="item-detail">
      <Header isLoggedIn={true} userName="yamakazu" />
      <h1>募集詳細</h1>

      <div className="item-detail-contents">
        <div className="item-detail-image">写真</div>

        <div className="item-detail-name">{item.itemName}</div>

        <div className="item-detail-price">{item.price}円</div>

        <div className="item-detail-description">
          {item.description}
        </div>

        <div className="item-detail-button-area">
          <input
            className="item-detail-cancel-button"
            type="button"
            value="戻る"
            onClick={() => navigate(-1)}
          />
          <input
            className="item-detail-post-button"
            type="submit"
            value={props.buttonLabel}
            onClick={() => navigate(props.nextPath)}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;