package io.github.anenene3.wanteditemapp.dto;

public class AccountEditDto {

    private Long userId;
    private String userName;

    public AccountEditDto() {
    }

    public AccountEditDto(Long userId, String userName) {
        this.userId = userId;
        this.userName = userName;
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
}