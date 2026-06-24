import "../App.css";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
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
    <>
      <Header />

      <div className="item-list">
        
        <h1 className="item-list-title">募集一覧</h1>

        <div className="item-list-contents">
          {items.map((item) => (
            <ItemCard
              key={item.itemId}
              name={item.itemName}
              imagePath={item.imagePath}
              price={item.price}
              onClick={() => navigate(`/item-detail/${item.itemId}`)}
            />
          ))}
        </div>

        <button
          className="item-list-post-button"
          type="button"
          onClick={() => navigate("/item-post")}
          aria-label="募集を投稿する"
        >
          <span className="item-list-post-button-plus">+</span>
        </button>
      </div>
    </>  
  );
}

export default ItemList;