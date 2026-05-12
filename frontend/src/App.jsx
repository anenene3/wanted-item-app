import "./App.css";
import ItemList from "./ItemList";
import ItemDetail from "./ItemDetail";
import ItemPost from "./ItemPost";
import MessageSend from "./MessageSend";
import Login from "./Login";
import SignUp from "./SignUp";
import AccountEdit from "./AccountEdit";
import MyItemList from "./MyItemList";
import ReceivedMessageList from "./ReceivedMessageList";
import ReceivedMessageDetail from "./ReceivedMessageDetail";
import { Routes, Route } from "react-router";
import ItemEdit from "./ItemEdit";


function App() {
  return (
    <Routes>
      <Route path="/" element={<ItemList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/item-post" element={<ItemPost />} />
      <Route
        path="/item-detail/:itemId"
        element={
          <ItemDetail
            buttonLabel="この募集に連絡する"
            nextPath="/message-send"
          />
        }
      />
      <Route path="/my-items" element={<MyItemList />} />
      <Route path="/messages" element={<ReceivedMessageList />} />
      <Route
        path="/messages/detail"
        element={
          <ReceivedMessageDetail
            sender="yamakazu"
            itemName="ゲームソフトA"
            messageBody="はじめまして。この商品についてご購入いただきたくご連絡いたしました。"
            contact="yamakazu@example.com"
            date="2026/04/28 11:30:29"
          />
        }
      />
      <Route
        path="/message-send"
        element={<MessageSend name="ゲームソフトA" />}
      />
      <Route path="/account-edit" element={<AccountEdit />} />
      <Route path="/item-edit" element={<ItemEdit />} />
    </Routes>
  );
}

export default App;