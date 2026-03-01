package com.together_for_her.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.together_for_her.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}

