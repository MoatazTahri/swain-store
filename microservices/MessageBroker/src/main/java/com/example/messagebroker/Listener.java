package com.example.messagebroker;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class Listener {
    Logger logger = Logger.getLogger(Listener.class.getName());

    @KafkaListener(topics = {"defaultTopic"}, groupId = "groupId")
    public void listener(String message) {
        logger.info("🤩 Message received from Kafka: " + message);
    }
}
