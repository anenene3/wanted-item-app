import "./App.css";
import ItemCard from "./ItemCard";
import Header from "./Header";
import {useNavigate} from "react-router";


function MyItemList() {
  const navigate=useNavigate();

  return (
    <div className="main">
      <Header isLoggedIn={true} userName="yamakazu" />
      <h1>自分の募集一覧</h1>

      <div className="my-item-list">
        <ItemCard name="ゲームソフトA" price="5000" onClick={()=> navigate("/item-edit")}/> 
        <ItemCard name="ゲームソフトB" price="8000" onClick={()=> navigate("/item-edit")}/>
      </div>
        
      <input
        className="my-item-list-post-button"
        type="button"
        value="募集投稿"
        onClick={()=> navigate("/item-post")}
      />
    </div>
  )
}

export default MyItemList;
