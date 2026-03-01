package com.together_for_her.controllers;

import com.together_for_her.paylods.ApiResponse;
import com.together_for_her.paylods.ProductDto;
import com.together_for_her.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/marketplace")

public class ProductController {

    @Autowired
    private ProductService productService;

    // Add product
    @PostMapping("/add")
    public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto productDto) {
        ProductDto savedProduct = productService.addProduct(productDto);
        return ResponseEntity.ok(savedProduct);
    }
    
    @PutMapping("/update/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto productDto,@PathVariable Integer productId) {
        ProductDto savedProduct = productService.updateProduct(productDto, productId);
        return ResponseEntity.ok(savedProduct);
    }
    
    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<ProductDto> deleteProduct(@PathVariable Integer productId) {
    	this.productService.deleteProduct(productId);
		return new ResponseEntity(new ApiResponse("Donor Deleated Successfully",true), HttpStatus.OK);
    }

    // Get all products
    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
}

