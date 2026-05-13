import "./App.css";
import Header from "./Header";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function ItemEdit() {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setItemName(data.itemName);
        setPrice(data.price);
        setDescription(data.description);
      })
      .catch((error) => console.error("編集データ取得エラー:", error));
  }, [itemId]);

  const handleSubmit = () => {
    fetch(`http://localhost:8080/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imagePath: null,
        itemName: itemName,
        price: Number(price),
        description: description
      })
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("更新成功:", data);
        navigate(`/item-detail/${itemId}`);
      })
      .catch((error) => console.error("更新エラー:", error));
  };

  return (
    <div className="item-edit">
      <Header isLoggedIn={true} userName="yamakazu" />
      <h1>募集編集</h1>

      <div className="item-edit-contents">
        <input
          className="item-edit-image"
          type="button"
          value="画像を選択"
        />

        <p>募集商品名</p>
        <input
          className="item-edit-name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <p>買い取り金額</p>
        <input
          className="item-edit-price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <p>詳細説明・募集条件</p>
        <textarea
          className="item-edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="item-edit-button-area">
          <input
            className="item-edit-cancel-button"
            type="button"
            value="戻る"
            onClick={() => navigate(-1)}
          />
          <input
            className="item-edit-post-button"
            type="button"
            value="編集完了"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemEdit;