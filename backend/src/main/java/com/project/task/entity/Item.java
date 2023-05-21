package com.project.task.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name="items")
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "price")
    private Long price;

}

