package io.github.anenene3.wanteditemapp.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import io.github.anenene3.wanteditemapp.dto.LoginForm;
import io.github.anenene3.wanteditemapp.dto.User;
import io.github.anenene3.wanteditemapp.dto.UserForm;

@Mapper
public interface UserMapper {

    User findByLoginInfo(LoginForm loginForm);
    
    int insert(UserForm userForm);
    
    User findByLoginId(@Param("loginId") String loginId);
}