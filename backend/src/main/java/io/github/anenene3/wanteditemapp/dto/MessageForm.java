package io.github.anenene3.wanteditemapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// メッセージ送信用のFormクラス
// フィールドを作成
// - Long itemId
// - Long senderUserId
// - String messageBody
// - String contact
public class MessageForm {
	
	@NotNull(message = "商品IDが不正です")
	private Long itemId;
	
	@NotNull(message = "送信者ユーザーIDが不正です")
	private Long senderUserId;
	
	@NotBlank(message = "メッセージを入力してください")
	private String messageBody;
	
	@NotBlank(message = "連絡先を入力してください")
	private String contact;

	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

	public Long getSenderUserId() {
		return senderUserId;
	}

	public void setSenderUserId(Long senderUserId) {
		this.senderUserId = senderUserId;
	}

	public String getMessageBody() {
		return messageBody;
	}

	public void setMessageBody(String messageBody) {
		this.messageBody = messageBody;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}
}
