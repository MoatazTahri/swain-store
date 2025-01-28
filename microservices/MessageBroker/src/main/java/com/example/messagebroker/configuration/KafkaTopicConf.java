package com.example.messagebroker.configuration;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConf {

    @Bean
    public NewTopic defaultTopic() {
        return TopicBuilder.name("defaultTopic").build();
    }
}
