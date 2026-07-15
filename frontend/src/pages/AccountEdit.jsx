import "../App.css";
import Header from "../components/Header";
import {useNavigate} from "react-router";
import { useEffect, useState } from "react";

function AccountEdit(){
  const navigate=useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("loginUser")
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser || !loginUser.userId) {
      alert("ログイン情報が見つかりません");
      navigate("/login");
      return;
    }

      fetch(`http://localhost:8080/accounts/${loginUser.userId}`)
      .then((response) => response.text())
      .then((text) => {
        if (!text) {
          alert("アカウント情報の取得に失敗しました");
          return;
          }
        const data = JSON.parse(text);
        setUserName(data.userName);
      })
      .catch((error) => {
        console.error("アカウント取得エラー:", error);
        alert("アカウント情報の取得中にエラーが発生しました");
      });
  }, [navigate]);

  const handleUpdate = () => {
    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser || !loginUser.userId) {
      alert("ログイン情報が見つかりません");
      navigate("/login");
      return;
    }

    if (!userName.trim()) {
      alert("ユーザーネームを入力してください");
      return;
    }

    if (password !== confirmationPassword) {
      alert("パスワードと確認用パスワードが一致していません");
      return;
    }

    fetch(`http://localhost:8080/accounts/${loginUser.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: userName,
        password: password
      })
    })
    .then((response) => response.text())
    .then((data) => {
      if (data === "更新成功") {
        const updatedLoginUser = {
            ...loginUser,
            userName: userName
        };

        localStorage.setItem("loginUser", JSON.stringify(updatedLoginUser));
        alert("アカウント情報を更新しました");
        navigate("/", { replace: true });
        return;
      }
        alert(data);
    })
    .catch((error) => {
      console.error("更新エラー:", error);
      alert("更新中にエラーが発生しました");
    })
  };

  const handleDelete = () => {
    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser || !loginUser.userId) {
      alert("ログイン情報が見つかりません");
      navigate("/login");
      return;
    }

    const result = window.confirm("本当にアカウントを削除しますか？");
    if (!result) {
      return;
    }

    fetch(`http://localhost:8080/accounts/${loginUser.userId}`, {
      method: "DELETE"
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "削除成功") {
          localStorage.removeItem("loginUser");
          alert("アカウントを削除しました");
          navigate("/login", { replace: true });
          return;
        }

        alert(data);
      })
      .catch((error) => {
        console.error("削除エラー:", error);
        alert("削除中にエラーが発生しました");
      });
  };

  return(
    <>
      <Header />
      <div className="account-edit">
      
        <h1 className="account-edit-title">アカウント編集</h1>
        <div className="account-edit-contents">
          <p>ユーザーネーム：</p>
          
          <input
            className="account-edit-user-name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <p>新しいパスワード:</p>
          
          <input 
            className="account-edit-password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p>新しいパスワード（確認用）:</p>
          
          <input 
          className="account-edit-confirm-password" 
          type="password"
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
          />

          <input
            className="account-edit-send-button"
            type="button"
            value="変更確定"
            onClick={handleUpdate}
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
            value="アカウント削除"
            onClick={handleDelete}
          />
        </div>
      </div>
    </>
  )
}

export default AccountEdit;