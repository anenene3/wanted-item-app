package io.github.anenene3.wanteditemapp.mapper;

import org.apache.ibatis.annotations.Mapper;

import io.github.anenene3.wanteditemapp.dto.LoginForm;
import io.github.anenene3.wanteditemapp.dto.User;

@Mapper
public interface UserMapper {

    User findByLoginInfo(LoginForm loginForm);
}