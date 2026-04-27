import "./App.css";

function SignUp(){
  return(
    <div className="signup">
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
        />

        <input
          className="signup-cancel-button"
          type="button"
          value="キャンセル"
        />
      </div>
    </div>
  )
}

export default SignUp;