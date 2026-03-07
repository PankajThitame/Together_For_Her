package com.together_for_her.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig {

    @org.springframework.beans.factory.annotation.Value("${ALLOWED_ORIGINS:http://localhost:3000}")
    private String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }

            @Override
            public void addResourceHandlers(
                    org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry registry) {
                String uploadDir = System.getProperty("user.dir") + "/uploads";
                // Better yet, use the value from properties if possible, but for dynamic
                // config:
                registry.addResourceHandler("/uploads/**")
                        .addResourceLocations("file:/app/uploads/", "file:uploads/");
            }
        };
    }
}
