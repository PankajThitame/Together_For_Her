package com.together_for_her.paylods;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private int id;
    private String productName;
    private String description;
    private double price;
    private String category;
    private String imageUrl;
    private int stock;
    private String availability;
}
