import "./App.css";
import Header from "./Header";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function ItemList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("データ取得エラー:", error));
  }, []);

  return (
    <div className="main">
      <Header isLoggedIn={false} />
      <h1>募集一覧</h1>

      <div className="item-list">
        {items.map((item) => (
          <ItemCard
            key={item.itemId}
            name={item.itemName}
            price={item.price}
            onClick={() => navigate(`/item-detail/${item.itemId}`)}
          />
        ))}
      </div>

      <input
        className="item-list-post-button"
        type="button"
        value="募集投稿"
        onClick={() => navigate("/item-post")}
      />
    </div>
  );
}

export default ItemList;