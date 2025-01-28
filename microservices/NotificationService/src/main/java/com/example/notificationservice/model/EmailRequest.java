package com.example.notificationservice.model;

import com.example.notificationservice.enumeration.EmailType;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class EmailRequest {
    private String senderName;
    private String receiverEmail;
    private String receiverName;
    private String subject;
    private EmailParameters params;
    private EmailType emailType;
}
