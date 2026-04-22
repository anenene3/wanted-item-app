import "./App.css";
import ItemCard from "./ItemCard";

function App() {
  return (
    <div className="main">
      <h1>募集一覧</h1>

      <div className="item-list">
        <ItemCard name="ゲームソフトA" price="5000" /> {/*後で投稿フォームの入力値をItemCardに持つように変更、propsに写真も加える（URLを渡す方式にするかは未定）*/} 
        <ItemCard name="ゲームソフトB" price="8000" />
      </div>
    </div>

  );
}

export default App;