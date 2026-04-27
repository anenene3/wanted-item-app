import "./App.css";

function Login(){
  return(
    <div className="login">
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
        />

        <p className="login-signup-text">アカウントをお持ちでない方</p>

        <input
          className="login-signup-button"
          type="button"
          value="新規登録"
        />
      </div>
    </div>
  )
}

export default Login;
