package io.github.anenene3.wanteditemapp.mapper;

import org.apache.ibatis.annotations.Mapper;

import io.github.anenene3.wanteditemapp.dto.Message;

@Mapper
public interface MessageMapper {

    int insert(Message message);

}
