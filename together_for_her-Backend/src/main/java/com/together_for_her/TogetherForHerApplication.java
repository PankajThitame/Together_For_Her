package com.together_for_her;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.together_for_her")
public class TogetherForHerApplication {
    public static void main(String[] args) {
        SpringApplication.run(TogetherForHerApplication.class, args);
    }

    @org.springframework.context.annotation.Bean
    public org.modelmapper.ModelMapper modelMapper() {
        return new org.modelmapper.ModelMapper();
    }

    @org.springframework.context.annotation.Bean
    public org.springframework.web.client.RestTemplate restTemplate() {
        return new org.springframework.web.client.RestTemplate();
    }
}
