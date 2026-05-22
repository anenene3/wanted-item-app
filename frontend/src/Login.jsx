import "./App.css";
import Header from "./Header";
import { useNavigate } from "react-router";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginId: loginId,
        password: password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data || !data.userId) {
          alert("ログインIDまたはパスワードが違います");
          return;
        }

        localStorage.setItem("loginUser", JSON.stringify(data));
        navigate("/");
      })
      .catch((error) => console.error("ログインエラー:", error));
  };

  return (
    <div className="login">
      <Header />
      <h1>ログイン</h1>
      <div className="login-contents">
        <p>ユーザーID:</p>
        <input
          className="login-user-id"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <p>パスワード:</p>
        <input
          className="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="login-send-button"
          type="button"
          value="ログイン"
          onClick={handleLogin}
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
  );
}

export default Login;