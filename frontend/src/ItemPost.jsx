import "./App.css";
import Header from "./Header";
import { useNavigate } from "react-router";
import { useState } from "react";

function ItemPost() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:8080/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: 1,
        imagePath: null,
        itemName: itemName,
        price: Number(price),
        description: description
      })
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("投稿成功:", data);
        navigate("/");
      })
      .catch((error) => console.error("投稿エラー:", error));
  };

  return (
    <div className="item-post">
      <Header isLoggedIn={true} userName="yamakazu" />
      <h1>募集投稿</h1>

      <div className="item-post-contents">
        <input
          className="item-post-image"
          type="button"
          value="画像を選択"
        />

        <p>募集商品名</p>
        <input
          className="item-post-name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <p>買い取り金額</p>
        <input
          className="item-post-price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <p>詳細説明・募集条件</p>
        <textarea
          className="item-post-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="item-post-button-area">
          <input
            className="item-post-cancel-button"
            type="button"
            value="戻る"
            onClick={() => navigate(-1)}
          />
          <input
            className="item-post-post-button"
            type="button"
            value="この内容で募集する"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemPost;