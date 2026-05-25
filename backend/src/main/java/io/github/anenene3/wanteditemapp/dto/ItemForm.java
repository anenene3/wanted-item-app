package io.github.anenene3.wanteditemapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ItemForm {

    private Long itemId;
    
    private Long userId;
    
    private String imagePath;
    
    @NotBlank(message = "商品名を入力してください")
    private String itemName;
    
    @NotNull(message = "買い取り金額を入力してください")
    @Min(value = 1, message = "買い取り金額は1以上で入力してください")
    private Integer price;
    
    @NotBlank(message = "詳細説明・募集条件を入力してください")
    private String description;

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}