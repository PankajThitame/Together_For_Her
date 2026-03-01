package com.together_for_her.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String productName;

    @Column(length = 1000)
    private String description;

    private double price;

    private String category;

    private String imageUrl;

    private int stock;

    private String availability;  // e.g., "In Stock", "Out of Stock"
}

