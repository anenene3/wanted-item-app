import "./App.css";
import {useNavigate} from "react-router";

function Header(props) {
  const navigate=useNavigate();

  return (
    <div className="header">
      <div className="header-logo" onClick={()=>{navigate("/")}}>wanted-item-app</div>

      {props.isLoggedIn ? (
        <div className="header-menu">
          <input 
            className="header-notification-button"
            type="button" 
            value="通知" 
            onClick={()=>navigate("/messages")}
          />
          <input 
            className="header-my-items-button"
            type="button" 
            value="あなたの募集"
            onClick={()=>navigate("/my-items")}
          />
          <div className="header-user-name" onClick={()=> navigate("/account-edit")}>{props.userName}</div>
        </div>
      ) : (
        <div className="header-menu">
          <input 
            type="button" 
            value="ログイン" 
            onClick={()=>navigate("/login")}
          />
        </div>
      )}
    </div>
  );
}

export default Header;