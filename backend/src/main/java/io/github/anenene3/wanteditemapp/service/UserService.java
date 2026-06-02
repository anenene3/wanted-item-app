package io.github.anenene3.wanteditemapp.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import io.github.anenene3.wanteditemapp.dto.AccountUpdateForm;
import io.github.anenene3.wanteditemapp.dto.LoginForm;
import io.github.anenene3.wanteditemapp.dto.User;
import io.github.anenene3.wanteditemapp.mapper.UserMapper;
import io.github.anenene3.wanteditemapp.dto.UserForm;
import io.github.anenene3.wanteditemapp.dto.LoginUserDto;
import io.github.anenene3.wanteditemapp.dto.AccountEditDto;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public LoginUserDto login(LoginForm loginForm) {
        User user = userMapper.findByLoginId(loginForm.getLoginId());

        if (user == null) {
            return null;
        }

        if (!passwordEncoder.matches(loginForm.getPassword(), user.getPassword())) {
            return null;
        }

        return new LoginUserDto(
            user.getUserId(),
            user.getUserName(),
            user.getLoginId()
        );
    }
    
    public int insert(UserForm userForm) {
        User existingUser = userMapper.findByLoginId(userForm.getLoginId());

        if (existingUser != null) {
            return 0;
        }

        userForm.setPassword(passwordEncoder.encode(userForm.getPassword()));
        int count = userMapper.insert(userForm);

        if (count == 1) {
            return 1;
        }

        return -1;
    }
    
    public AccountEditDto findLoginUserById(long userId) {
    	User user = userMapper.findById(userId);
    	
    	 if (user == null) {
    	        return null;
    	 }
    	 
    	 return new AccountEditDto(
    		 user.getUserId(),
             user.getUserName()
         );
    }
    
    public int update(AccountUpdateForm accountUpdateForm) {
    	User existingUser = userMapper.findById(accountUpdateForm.getUserId());

        if (existingUser == null) {
            return 0;
        }

        if (accountUpdateForm.getPassword() == null || accountUpdateForm.getPassword().isBlank()) {
            return userMapper.updateUserNameOnly(accountUpdateForm);
        }

        accountUpdateForm.setPassword(passwordEncoder.encode(accountUpdateForm.getPassword()));
        return userMapper.updateWithPassword(accountUpdateForm);
    }
    
    public int delete(long userId) {
    	return userMapper.delete(userId);
    }
}