import "../App.css";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function ItemDetail() {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loginUser");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    setLoginUser(parsedUser);

    fetch(`http://localhost:8080/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error("詳細データ取得エラー:", error));
  }, [itemId]);

  if (!item) {
    return <div>読み込み中...</div>;
  }

  const isMyItem = loginUser && item.userId === loginUser.userId;

  return (
    <div className="item-detail">
      <Header />
      <h1>募集詳細</h1>

      <div className="item-detail-contents">

        <div className="item-detail-image">
          {item.imagePath ? (
            <img
              src={item.imagePath}
              alt="商品画像"
              className="item-detail-image-tag"
            />
          ) : (
            "画像無し"
          )}
        </div>

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

          {isMyItem ? (
            <input
              className="item-detail-post-button"
              type="button"
              value="編集する"
              onClick={() => navigate(`/item-edit/${item.itemId}`)}
            />
          ) : (
            <input
              className="item-detail-post-button"
              type="button"
              value="連絡する"
              onClick={() => navigate(`/message-send/${item.itemId}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;