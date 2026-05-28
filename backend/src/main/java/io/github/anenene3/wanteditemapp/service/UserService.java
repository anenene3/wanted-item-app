package io.github.anenene3.wanteditemapp.service;

import org.springframework.stereotype.Service;

import io.github.anenene3.wanteditemapp.dto.LoginForm;
import io.github.anenene3.wanteditemapp.dto.User;
import io.github.anenene3.wanteditemapp.mapper.UserMapper;
import io.github.anenene3.wanteditemapp.dto.UserForm;

@Service
public class UserService {

    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public User login(LoginForm loginForm) {
        return userMapper.findByLoginInfo(loginForm);
    }
    
    public int insert(UserForm userForm) {
    	User existingUser = userMapper.findByLoginId(userForm.getLoginId());
    	
    	if(existingUser != null) {
    		return 0;
    	}
    	
    	return userMapper.insert(userForm);
    }
}