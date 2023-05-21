package com.project.task.repository;

import com.project.task.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository  extends JpaRepository<Item, Long> {
    public List<Item> findAllByOrderByIdDesc();
}