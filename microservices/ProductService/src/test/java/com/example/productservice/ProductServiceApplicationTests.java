package com.example.productservice;

import com.example.productservice.model.ProductRequest;
import com.example.productservice.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.testcontainers.containers.MongoDBContainer;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductServiceApplicationTests {



    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private ProductRepository productRepository;



    private ProductRequest virtualProductRequest() {
        return ProductRequest.builder()
                .name("sample name")
                .description("sample description")
                .build();
    }

    @Test
    void shouldCreateProduct() throws Exception {
        int initialTableSize = productRepository.findAll().size();
        ProductRequest virtualProductRequest = virtualProductRequest();
        String sampleProductRequestJson = mapper.writeValueAsString(virtualProductRequest);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/product/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(sampleProductRequestJson))
                .andExpect(status().isCreated());
        Assertions.assertEquals(initialTableSize + 1, productRepository.findAll().size());
    }

}
