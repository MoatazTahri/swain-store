package com.example.notificationservice.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.FileSystemResource;

@Configuration
@PropertySource("file:.env")
@PropertySource("file:NotificationService/.env") // That's because the application is trying to read
// smtp in application.properties before initializing the .env file, which will cause a null exception.
public class GlobalConfig {

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        PropertySourcesPlaceholderConfigurer configurer = new PropertySourcesPlaceholderConfigurer();
        configurer.setLocations(
                new FileSystemResource(".env"),
                new FileSystemResource("NotificationService/.env"));
        return configurer;
    }
}
