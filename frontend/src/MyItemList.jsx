import "./App.css";
import ItemCard from "./ItemCard";
import Header from "./Header";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function MyItemList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users/1/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("自分の募集一覧取得エラー:", error));
  }, []);

  return (
    <div className="main">
      <Header isLoggedIn={true} userName="yamakazu" />
      <h1>自分の募集一覧</h1>

      <div className="my-item-list">
        {items.map((item) => (
          <ItemCard
            key={item.itemId}
            name={item.itemName}
            price={item.price}
            onClick={() => navigate(`/item-edit/${item.itemId}`)}
          />
        ))}
      </div>

      <input
        className="my-item-list-post-button"
        type="button"
        value="募集投稿"
        onClick={() => navigate("/item-post")}
      />
    </div>
  );
}

export default MyItemList;