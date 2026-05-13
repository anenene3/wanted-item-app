package io.github.anenene3.wanteditemapp;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.anenene3.wanteditemapp.dto.Item;
import io.github.anenene3.wanteditemapp.dto.ItemForm;
import io.github.anenene3.wanteditemapp.service.ItemService;

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
    public String insert(@RequestBody ItemForm itemForm) {
        itemService.insert(itemForm);
        return "登録成功";
    }

    @PutMapping("/items/{itemId}")
    public String update(@PathVariable Long itemId, @RequestBody ItemForm itemForm) {
        itemForm.setItemId(itemId);
        itemService.update(itemForm);
        return "更新成功";
    }
}