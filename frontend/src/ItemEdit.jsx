import "./App.css";
import Header from "./Header";
import {useNavigate} from "react-router";

function ItemEdit() {
  const navigate=useNavigate();

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
        <input className="item-edit-name" />

        <p>買い取り金額</p>
        <input className="item-edit-price" />

        <p>詳細説明・募集条件</p>
        <textarea className="item-edit-description" />
        
        <div className="item-edit-button-area">
          <input
            className="item-edit-cancel-button"
            type="button"
            value="戻る"
            onClick={() => navigate(-1)}
          />
          <input
            className="item-edit-post-button"
            type="submit"
            value="編集完了"
            onClick={()=>navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemEdit;