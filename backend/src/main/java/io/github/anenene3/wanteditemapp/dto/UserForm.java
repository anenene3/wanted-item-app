package io.github.anenene3.wanteditemapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserForm {

    @NotBlank(message = "ユーザーネームを入力してください")
    @Size(max = 20, message = "ユーザーネームは20文字以内で入力してください")
    private String userName;

    @NotBlank(message = "ユーザーIDを入力してください")
    @Pattern(
        regexp = "^[a-zA-Z0-9_-]+$",
        message = "ユーザーIDは半角英数字、アンダースコア、ハイフンのみ使用できます"
    )
    @Size(min = 4, max = 20, message = "ユーザーIDは4文字以上20文字以内で入力してください")
    private String loginId;

    @NotBlank(message = "パスワードを入力してください")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$",
        message = "パスワードは8文字以上で、大文字・小文字・数字・記号をそれぞれ1つ以上含めてください"
    )
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
