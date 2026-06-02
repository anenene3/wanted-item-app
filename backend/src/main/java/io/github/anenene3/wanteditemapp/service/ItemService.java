package io.github.anenene3.wanteditemapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.anenene3.wanteditemapp.dto.Item;
import io.github.anenene3.wanteditemapp.dto.ItemForm;
import io.github.anenene3.wanteditemapp.mapper.ItemMapper;


@Service
public class ItemService {

    private final ItemMapper itemMapper;

    public ItemService(ItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    public List<Item> findAll() {
        return itemMapper.findAll();
    }

    public Item findById(Long itemId) {
        return itemMapper.findById(itemId);
    }

    public int insert(ItemForm itemForm) {
        return itemMapper.insert(itemForm);
    }
    
    public int update(ItemForm itemForm) {
        return itemMapper.update(itemForm);
    }
    
    public int delete(Long itemId) {
    	return itemMapper.delete(itemId);
    }
    
    public List<Item> findByUserId(long userId) {
        return itemMapper.findByUserId(userId);
    }

}