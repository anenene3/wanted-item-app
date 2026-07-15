import "../App.css";
import ItemCard from "../components/ItemCard";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function MyItemList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {

    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser || !loginUser.userId) {
      alert("ログインしてください");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/users/${loginUser.userId}/items`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("自分の募集一覧取得エラー:", error));
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="my-item-list">
        
        <h1 className="my-item-list-title">自分の募集一覧</h1>

        <div className="my-item-list-contents">
          {items.map((item) => (
            <ItemCard
              key={item.itemId}
              name={item.itemName}
              imagePath={item.imagePath}
              price={item.price}
              onClick={() => navigate(`/item-detail/${item.itemId}`, {state: { from: "my-items"}})}
            />
          ))}
        </div>

        <button
          className="my-item-list-post-button"
          type="button"
          onClick={() => navigate("/item-post")}
          aria-label="募集を投稿する"
        >
          <span className="my-item-list-post-button-plus">+</span>
        </button>
      </div>
    </>
  );
}

export default MyItemList;