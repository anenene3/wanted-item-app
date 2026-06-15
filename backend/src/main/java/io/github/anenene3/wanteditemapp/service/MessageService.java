package io.github.anenene3.wanteditemapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import io.github.anenene3.wanteditemapp.dto.Item;
import io.github.anenene3.wanteditemapp.dto.Message;
import io.github.anenene3.wanteditemapp.dto.MessageDetailDto;
import io.github.anenene3.wanteditemapp.dto.MessageForm;
import io.github.anenene3.wanteditemapp.dto.ReceivedMessageDto;
import io.github.anenene3.wanteditemapp.mapper.ItemMapper;
import io.github.anenene3.wanteditemapp.mapper.MessageMapper;

@Service
public class MessageService {

    private final MessageMapper messageMapper;
    private final ItemMapper itemMapper;

    public MessageService(MessageMapper messageMapper, ItemMapper itemMapper) {
        this.messageMapper = messageMapper;
        this.itemMapper = itemMapper;
    }

    public int insert(MessageForm messageForm) {
        Item item = itemMapper.findById(messageForm.getItemId());

        if (item == null) {
            // 対象の募集が見つからない場合は処理しない
            return 0;
        }

        Message message = new Message();
        message.setItemId(messageForm.getItemId());
        message.setSenderUserId(messageForm.getSenderUserId());
        message.setReceiverUserId(item.getUserId());
        message.setMessageBody(messageForm.getMessageBody());
        message.setContact(messageForm.getContact());
        message.setSentAt(LocalDateTime.now());

        return messageMapper.insert(message);
    }
    
    public List<ReceivedMessageDto> findByReceiverUserId(Long receiverUserId){
    	return messageMapper.findByReceiverUserId(receiverUserId);
    }
    
    public MessageDetailDto findById(Long messageId) {
    	
    	return messageMapper.findById(messageId);
    }
}
