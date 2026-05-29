package io.github.anenene3.wanteditemapp.dto;

public class LoginUserDto {

    private Long userId;
    private String userName;
    private String loginId;

    public LoginUserDto() {
    }

    public LoginUserDto(Long userId, String userName, String loginId) {
        this.userId = userId;
        this.userName = userName;
        this.loginId = loginId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

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
}