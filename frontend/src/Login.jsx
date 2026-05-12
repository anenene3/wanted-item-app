import "./App.css";
import Header from "./Header";
import {useNavigate} from "react-router";

function Login(){
  const navigate=useNavigate();
    
  return(
    <div className="login">
      <Header isLoggedIn={false} />
      <h1>ログイン</h1>
      <div className="login-contents">
        <p>ユーザーID:</p>
        <input className="login-user-id"/>
        <p>パスワード:</p>
        <input className="login-password" type="password"/>
        <input
          className="login-send-button"
          type="button"
          value="ログイン"
          onClick={() => navigate("/")}
        />

        <p className="login-signup-text">アカウントをお持ちでない方</p>

        <input
          className="login-signup-button"
          type="button"
          value="新規登録"
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  )
}

export default Login;
