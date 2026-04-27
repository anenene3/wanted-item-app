import "./App.css";

function ItemPost() {
  return (
    <div className="item-post">
      <h1>募集投稿</h1>

      <div className="item-post-contents">
        <input 
            className="item-post-image" 
            type="button"
            value="画像を選択"
        />
        <p>募集商品名</p>
        <input className="item-post-name" />

        <p>買い取り金額</p>
        <input className="item-post-price" />

        <p>詳細説明・募集条件</p>
        <textarea className="item-post-description" />
        

        <input
          className="item-post-button"
          type="submit"
          value="この内容で募集する"
        />
      </div>
    </div>
  );
}

export default ItemPost;