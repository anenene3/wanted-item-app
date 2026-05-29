package io.github.anenene3.wanteditemapp.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import io.github.anenene3.wanteditemapp.dto.LoginForm;
import io.github.anenene3.wanteditemapp.dto.User;
import io.github.anenene3.wanteditemapp.mapper.UserMapper;
import io.github.anenene3.wanteditemapp.dto.UserForm;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public User login(LoginForm loginForm) {
        User user = userMapper.findByLoginId(loginForm.getLoginId());

        if (user == null) {
            return null;
        }

        if (!passwordEncoder.matches(loginForm.getPassword(), user.getPassword())) {
            return null;
        }

        return user;
    }
    
    public int insert(UserForm userForm) {
    	User existingUser = userMapper.findByLoginId(userForm.getLoginId());
    	
    	if(existingUser != null) {
    		return 0;
    	}
    	
    	userForm.setPassword(passwordEncoder.encode(userForm.getPassword()));
    	return userMapper.insert(userForm);
    }
}