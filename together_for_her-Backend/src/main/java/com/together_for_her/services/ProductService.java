package com.together_for_her.services;


import com.together_for_her.entities.Product;
import com.together_for_her.paylods.ProductDto;
import com.together_for_her.paylods.UserDto;

import java.util.List;

public interface ProductService {
    ProductDto addProduct(ProductDto productDto);
    List<ProductDto> getAllProducts();
    ProductDto updateProduct(ProductDto userDto, int productId);
    void deleteProduct(Integer donorId);
}
