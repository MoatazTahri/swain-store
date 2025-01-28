package com.example.notificationservice.controller;

import com.example.notificationservice.model.EmailRequest;
import com.example.notificationservice.service.MailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notification")
@AllArgsConstructor
public class EmailSenderController {

    private final MailService mailService;

    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestBody EmailRequest email) throws Exception {
        mailService.sendEmail(email);
        return ResponseEntity.ok("Email sent successfully");
    }
}
