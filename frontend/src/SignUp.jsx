import "./App.css";
import Header from "./Header";
import {useNavigate} from "react-router";

function SignUp(){
  const navigate=useNavigate();

  return(
    <div className="signup">
      <Header />
      <h1>新規アカウント登録</h1>
      <div className="signup-contents">
        <p>ユーザーネーム：</p>
        <input className="signup-user-name"/>
        <p>ユーザーID:</p>
        <input className="signup-user-id"/>
        <p>パスワード:</p>
        <input className="signup-password" type="password"/>
        <p>パスワード（確認用）:</p>
        <input className="signup-confirm-password" type="password"/>
        <input
          className="signup-send-button"
          type="button"
          value="新規登録"
          onClick={() => navigate("/login")}
        />

        <input
          className="signup-cancel-button"
          type="button"
          value="キャンセル"
          onClick={()=> navigate(-1)}
        />
      </div>
    </div>
  )
}

export default SignUp;