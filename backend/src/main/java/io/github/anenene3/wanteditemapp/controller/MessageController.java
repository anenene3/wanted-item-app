package io.github.anenene3.wanteditemapp.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import io.github.anenene3.wanteditemapp.dto.MessageForm;
import io.github.anenene3.wanteditemapp.dto.ReceivedMessageDto;
import io.github.anenene3.wanteditemapp.service.MessageService;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
// メッセージ送信用のControllerクラス
// MessageServiceをインジェクション
// POST /messages エンドポイントを作成
// @Valid @RequestBody messageForm　と　BindingResult　を使う
// バリデーションエラー時は、　getDefaultMessage　を返す
// messageService.insert(messageForm)の結果が1なら「送信成功」を返す
// それ以外は「送信失敗」を返す

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {
	
	private final MessageService messageService;
	
	public MessageController(MessageService messageService) {
	    this.messageService = messageService;
	}
	
	@PostMapping("/messages")
	public String insert(@Valid @RequestBody MessageForm messageForm, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return bindingResult.getFieldError().getDefaultMessage();
		}
		
		int count = messageService.insert(messageForm);
		
		if (count == 1) {
			return "送信成功";
		}
		
		return "送信失敗";
	}
	
	@GetMapping("/users/{userId}/messages")
	public List<ReceivedMessageDto> findByReceiverUserId(@PathVariable Long userId){
		return messageService.findByReceiverUserId(userId);
	}
}
