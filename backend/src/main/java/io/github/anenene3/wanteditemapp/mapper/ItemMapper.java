package io.github.anenene3.wanteditemapp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import io.github.anenene3.wanteditemapp.dto.Item;
import io.github.anenene3.wanteditemapp.dto.ItemForm;

import org.apache.ibatis.annotations.Param;

@Mapper
public interface ItemMapper {

    List<Item> findAll();

    Item findById(@Param("itemId") Long itemId);

    int insert(ItemForm itemForm);
    
    int update(ItemForm itemForm);
    
    int delete(@Param("itemId") Long itemId);
    
    List<Item> findByUserId(@Param("userId") Long userId);
    
}