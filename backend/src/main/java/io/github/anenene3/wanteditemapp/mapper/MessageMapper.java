package io.github.anenene3.wanteditemapp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import io.github.anenene3.wanteditemapp.dto.Message;
import io.github.anenene3.wanteditemapp.dto.MessageDetailDto;
import io.github.anenene3.wanteditemapp.dto.ReceivedMessageDto;

@Mapper
public interface MessageMapper {

    int insert(Message message);
    
    List<ReceivedMessageDto> findByReceiverUserId(@Param("receiverUserId") Long receiverUserId);

    MessageDetailDto findById(@Param("messageId") Long messageId);
}
