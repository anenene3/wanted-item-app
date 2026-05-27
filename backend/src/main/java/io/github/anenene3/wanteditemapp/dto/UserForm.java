package io.github.anenene3.wanteditemapp.dto;

import jakarta.validation.constraints.NotBlank;


public class UserForm {
	
	@NotBlank(message = "ユーザーネームを入力してください")
	private String userName;
	
	@NotBlank(message = "ユーザーIDを入力してください")
	private String loginId;
	
	@NotBlank(message = "パスワードを入力してください")
	private String password;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	

}
