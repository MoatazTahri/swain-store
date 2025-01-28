package com.example.notificationservice.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailParameters {
    private String company;
    private String colorCode;
    private String tokenExpiration;
    private String confirmationLink;
}
