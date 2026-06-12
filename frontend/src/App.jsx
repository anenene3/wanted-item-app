import "./App.css";
import ItemList from "./pages/ItemList";
import ItemDetail from "./pages/ItemDetail";
import ItemPost from "./pages/ItemPost";
import MessageSend from "./pages/MessageSend";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AccountEdit from "./pages/AccountEdit";
import MyItemList from "./pages/MyItemList";
import ReceivedMessageList from "./pages/ReceivedMessageList";
import ReceivedMessageDetail from "./pages/ReceivedMessageDetail";
import { Routes, Route } from "react-router";
import ItemEdit from "./pages/ItemEdit";


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
        path="/messages/detail/:message.messageId"
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
        path="/message-send/:itemId"
        element={<MessageSend/>}
      />
      <Route path="/account-edit" element={<AccountEdit />} />
      <Route path="/item-edit/:itemId" element={<ItemEdit />} />
    </Routes>
  );
}

export default App;