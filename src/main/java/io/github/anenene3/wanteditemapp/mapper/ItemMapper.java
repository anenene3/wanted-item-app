package io.github.anenene3.wanteditemapp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import io.github.anenene3.wanteditemapp.dto.Item;

@Mapper
public interface ItemMapper {

    List<Item> findAll();
    
    Item findById(Long itemId);
}