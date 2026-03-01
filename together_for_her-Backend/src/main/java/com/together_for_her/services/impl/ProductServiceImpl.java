package com.together_for_her.services.impl;

import com.together_for_her.services.ProductService;
import com.together_for_her.entities.Donor;
import com.together_for_her.entities.Product;
import com.together_for_her.entities.User;
import com.together_for_her.exceptions.ResourceNotFoundException;
import com.together_for_her.paylods.ProductDto;
import com.together_for_her.paylods.UserDto;
import com.together_for_her.repos.ProductRepository;
import com.together_for_her.services.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ProductDto addProduct(ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);
        Product saved = productRepo.save(product);
        return modelMapper.map(saved, ProductDto.class);
    }
    
    @Override
	public ProductDto updateProduct(ProductDto userDto, int productId) {
		
		Product prod = this.productRepo.findById(productId).orElseThrow(()-> new ResourceNotFoundException("User","Id",productId));
		
		prod.setProductName(userDto.getProductName());
		prod.setDescription(userDto.getDescription());
		prod.setPrice(userDto.getPrice());
		prod.setCategory(userDto.getCategory());
		prod.setImageUrl(userDto.getImageUrl());
		prod.setStock(userDto.getStock());
		prod.setAvailability(userDto.getAvailability());

		
		Product updatedUser=this.productRepo.save(prod);
		
		return this.modelMapper.map(updatedUser, ProductDto.class);
	}

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepo.findAll();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
    }
    
    @Override
	public void deleteProduct(Integer donorId) {
		Product donor = this.productRepo.findById(donorId)
				.orElseThrow(() -> new ResourceNotFoundException("Product", "Id", donorId));

		this.productRepo.delete(donor);
	}

}

