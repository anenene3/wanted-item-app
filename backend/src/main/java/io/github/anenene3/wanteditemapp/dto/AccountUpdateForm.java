package io.github.anenene3.wanteditemapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AccountUpdateForm {
	
	private long userId;
	
	@NotBlank(message = "ユーザーネームを入力してください")
    @Size(max = 20, message = "ユーザーネームは20文字以内で入力してください")
	private String userName;
	
	@Pattern(
		    regexp = "^$|^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$",
		    message = "パスワードを変更する場合は8文字以上で、大文字・小文字・数字・記号をそれぞれ1つ以上含めてください"
		)
	@Size(max = 72, message = "パスワードは72文字以内で入力してください")
	private String password;
	
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

}
