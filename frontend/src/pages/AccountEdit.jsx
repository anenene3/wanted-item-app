import "../App.css";
import Header from "../components/Header";
import {useNavigate} from "react-router";

function AccountEdit(){
  const navigate=useNavigate();

  return(
    <div className="account-edit">
      <Header isLoggedIn={true} userName="yamakazu" />
      <h1>アカウント編集</h1>
      <div className="account-edit-contents">
        <p>ユーザーネーム：</p>
        <input className="account-edit-user-name"/>
        <p>パスワード:</p>
        <input className="account-edit-password" type="password"/>
        <p>パスワード（確認用）:</p>
        <input className="account-edit-confirm-password" type="password"/>
        <input
          className="account-edit-send-button"
          type="button"
          value="変更確定"
          onClick={()=> navigate("/login")}
        />
        <input
          className="account-edit-cancel-button"
          type="button"
          value="キャンセル"
          onClick={()=> navigate(-1)}
        />
        <input
          className="account-edit-delete-button"
          type="button"
          value="削除"
          onClick={()=> navigate("/")}
        />
      </div>
    </div>
  )
}

export default AccountEdit;