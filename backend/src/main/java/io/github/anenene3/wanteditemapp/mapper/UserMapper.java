package io.github.anenene3.wanteditemapp.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import io.github.anenene3.wanteditemapp.dto.User;
import io.github.anenene3.wanteditemapp.dto.UserForm;
import io.github.anenene3.wanteditemapp.dto.AccountUpdateForm;

@Mapper
public interface UserMapper {

    int insert(UserForm userForm);
    
    User findByLoginId(@Param("loginId") String loginId);
    
    User findById(@Param("userId") long userId);
    
    int updateUserNameOnly(AccountUpdateForm accountUpdateform);
    
    int updateWithPassword(AccountUpdateForm accountUpdateform);
    
    int delete(@Param("userId")long userId);
}