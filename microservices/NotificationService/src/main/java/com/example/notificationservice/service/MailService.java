package com.example.notificationservice.service;

import com.example.notificationservice.model.EmailRequest;

public interface MailService {
    void sendEmail(EmailRequest email) throws Exception;
}
