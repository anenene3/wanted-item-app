package io.github.anenene3.wanteditemapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

import io.github.anenene3.wanteditemapp.dto.Item;
import io.github.anenene3.wanteditemapp.dto.ItemForm;
import io.github.anenene3.wanteditemapp.service.ItemService;
import org.springframework.validation.BindingResult;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/items")
    public List<Item> findAll() {
        return itemService.findAll();
    }

    @GetMapping("/items/{itemId}")
    public Item findById(@PathVariable Long itemId) {
        return itemService.findById(itemId);
    }

    @PostMapping("/items")
    public String insert(@Valid @RequestBody ItemForm itemForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return bindingResult.getFieldError().getDefaultMessage();
        }

        int count = itemService.insert(itemForm);

        if (count == 1) {
            return "登録成功";
        }

        return "登録失敗";
    }

    @PutMapping("/items/{itemId}")
    public String update(@PathVariable Long itemId, @Valid @RequestBody ItemForm itemForm, BindingResult bindingResult) {
        itemForm.setItemId(itemId);

        if (bindingResult.hasErrors()) {
            return bindingResult.getFieldError().getDefaultMessage();
        }

        int count = itemService.update(itemForm);
        if (count == 1) {
            return "更新成功";
        }

        return "更新失敗";
    }
    
    @DeleteMapping("/items/{itemId}")
    public String delete(@PathVariable Long itemId)	{
    	int count = itemService.delete(itemId);
    	
    	if(count == 1) {
    		return "削除成功";
    	}
    	
    	return "削除失敗";
    }
    
    @GetMapping("/users/{userId}/items")
    public List<Item> findByUserId(@PathVariable Long userId) {
        return itemService.findByUserId(userId);
    }

}