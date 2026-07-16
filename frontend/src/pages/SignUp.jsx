import "../App.css";
import Header from "../components/Header";
import {useNavigate} from "react-router";
import { useState } from "react";

function SignUp(){
  const navigate=useNavigate();

  const [userName, setUserName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const handleSignUp = () => {
     if (!userName.trim()) {
      alert("ユーザーネームを入力してください");
      return;
    }

    if (!loginId.trim()) {
      alert("ユーザーIDを入力してください");
      return;
    }

    if (!password.trim()) {
      alert("パスワードを入力してください");
      return;
    }

    if (!confirmationPassword.trim()) {
      alert("確認用パスワードを入力してください");
      return;
    }

    if (password !== confirmationPassword) {
      alert("パスワードと確認用パスワードが一致していません");
      return;
    }


    fetch("http://localhost:8080/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: userName,
        loginId: loginId,
        password: password
      })
    })
    .then((response) => response.text())
    .then((data) => {
      if (data === "登録成功") {
        alert("アカウント登録が完了しました。ログインしてください。");
        navigate("/login", { replace: true });
        return;
      }

      if (data === "ログインID重複") {
        alert("そのユーザーIDは既に使われています");
        return;
      }

      if (data === "登録失敗") {
        alert("登録に失敗しました");
        return;
      }

      alert(data);
    })
    .catch((error) => {
      console.error("登録エラー:", error);
      alert("登録中にエラーが発生しました");
    })
  };

  return(
    <div className="page-background">
      <Header />
      <div className="signup">

        <h1 className="signup-title">新規アカウント登録</h1>
        <div className="signup-contents">

          <p>ユーザーネーム：</p>
          <input 
            className="signup-user-name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <p>ユーザーID:</p>
          <input 
            className="signup-user-id"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />

          <p>パスワード:</p>
          <input 
            className="signup-password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p>パスワード（確認用）:</p>
          <input 
            className="signup-confirm-password" 
            type="password"
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
          />

          <input
            className="signup-send-button"
            type="button"
            value="新規登録"
            onClick={handleSignUp}
          />

          <input
            className="signup-cancel-button"
            type="button"
            value="キャンセル"
            onClick={()=> navigate(-1)}
          />
        </div>
      </div>
    </div>
  )
}

export default SignUp;