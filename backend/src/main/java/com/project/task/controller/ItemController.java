package com.project.task.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.task.entity.Item;
import com.project.task.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;


    @GetMapping("/api/items")
    public List<Item> getItems() {
        List<Item> itemList = itemRepository.findAllByOrderByIdDesc();
        System.out.println(itemList);
        return itemList;
    }


    @GetMapping("/api/get/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            System.out.println(item);
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/add")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        try {
            System.out.println(item);
            Item newItem = new Item();
            newItem.setTitle(item.getTitle());
            newItem.setAuthor(item.getAuthor());
            newItem.setPrice(item.getPrice());
            newItem = itemRepository.save(newItem);
            System.out.println("new +" + newItem);
            return ResponseEntity.ok(newItem);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/api/edit/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            item.setTitle(updatedItem.getTitle());
            item.setAuthor(updatedItem.getAuthor());
            item.setPrice(updatedItem.getPrice());

            itemRepository.save(item);
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/api/delete/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {
        try {

            Optional<Item> optionalItem = itemRepository.findById(id);
            if (optionalItem.isPresent()) {

                itemRepository.deleteById(id);
                return ResponseEntity.ok("Item deleted");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting item");
        }
    }




}
