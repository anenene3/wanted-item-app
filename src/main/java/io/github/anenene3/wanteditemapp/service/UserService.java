package io.github.anenene3.wanteditemapp.service;

import org.springframework.stereotype.Service;

import io.github.anenene3.wanteditemapp.dto.LoginForm;
import io.github.anenene3.wanteditemapp.dto.User;
import io.github.anenene3.wanteditemapp.mapper.UserMapper;

@Service
public class UserService {

    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public User login(LoginForm loginForm) {
        return userMapper.findByLoginInfo(loginForm);
    }
}