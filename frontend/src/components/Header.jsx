import "../App.css";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Bell, List } from "lucide-react";

function Header() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loginUser");

    if (savedUser) {
      setLoginUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setLoginUser(null);
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-logo" onClick={() => navigate("/")}>
        W.I.P
      </div>

      {loginUser ? (
        <div className="header-menu">
          <button
            className="header-icon-button"
            type="button"
            onClick={() => navigate("/messages")}
            aria-label="受信メッセージ"
            title="受信メッセージ"
          >
            <Bell size={28} strokeWidth={2.2} />
          </button>

          <button
            className="header-icon-button"
            type="button"
            onClick={() => navigate("/my-items")}
            aria-label="自分の募集"
            title="自分の募集"
          >
            <List size={28} strokeWidth={2.2} />
          </button>

          <div className="header-user-menu" ref={userMenuRef}>
            <button
              className="header-user-button"
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              {loginUser.userName}
            </button>

            {isUserMenuOpen && (
              <div className="header-user-dropdown">
                <button
                  className="header-user-dropdown-item"
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate("/account-edit");
                  }}
                >
                  アカウント編集
                </button>

                <button
                  className="header-user-dropdown-item"
                  type="button"
                  onClick={handleLogout}
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="header-menu">
          <input
            className="header-login-button"
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