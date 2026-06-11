import "../App.css";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function ItemEdit() {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser || !loginUser.userId) {
      alert("ログインしてください");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setItemName(data.itemName);
        setPrice(String(data.price));
        setDescription(data.description);
      })
      .catch((error) => console.error("編集データ取得エラー:", error));
  }, [itemId, navigate]);

  const handleUpdate = () => {
    if (!itemName.trim()) {
      alert("募集商品名を入力してください");
      return;
    }

    if (!price.trim()) {
      alert("買い取り金額を入力してください");
      return;
    }

    if (isNaN(price)) {
      alert("買い取り金額は半角数字で入力してください");
      return;
    }

    if (Number(price) <= 0) {
      alert("買い取り金額は1以上で入力してください");
      return;
    }

    if (!description.trim()) {
      alert("詳細説明・募集条件を入力してください");
      return;
    } 

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
      if (data === "更新成功") {
        alert("募集情報を更新しました");
        navigate(`/item-detail/${itemId}`);
        return;
      }

        alert(data);
    })
    .catch((error) => {
      console.error("更新エラー:", error);
      alert("更新中にエラーが発生しました");
    })
  };

const handleDelete = () => {
  const result = window.confirm("本当に削除しますか？");
  if (!result) {
    return;
  }

  fetch(`http://localhost:8080/items/${itemId}`, {
    method: "DELETE"
  })
    .then((response) => response.text())
    .then((data) => {
      if(data === "削除成功"){
        alert("募集を削除しました");
        navigate(`/my-items`);
        return;
      }
      alert(data);
    })
    .catch((error) => {
      console.error("削除エラー:", error)
      alert("削除中にエラーが発生しました")
    });
};

  

  return (
    <div className="item-edit">
      <Header />
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
            onClick={handleUpdate}
          />
          <input
            className="item-edit-delete-button"
            type="button"
            value="削除"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemEdit;