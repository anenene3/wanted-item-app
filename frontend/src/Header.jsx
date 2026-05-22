import "./App.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loginUser");

    if (savedUser) {
      setLoginUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setLoginUser(null);
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-logo" onClick={() => navigate("/")}>
        wanted-item-app
      </div>

      {loginUser ? (
        <div className="header-menu">
          <input
            className="header-notification-button"
            type="button"
            value="通知"
            onClick={() => navigate("/messages")}
          />
          <input
            className="header-my-items-button"
            type="button"
            value="あなたの募集"
            onClick={() => navigate("/my-items")}
          />
          <div
            className="header-user-name"
            onClick={() => navigate("/account-edit")}
          >
            {loginUser.userName}
          </div>
          <input
            className="header-logout-button"
            type="button"
            value="ログアウト"
            onClick={handleLogout}
          />
        </div>
      ) : (
        <div className="header-menu">
          <input
            type="button"
            value="ログイン"
            onClick={() => navigate("/login")}
          />
        </div>
      )}
    </div>
  );
}

export default Header;