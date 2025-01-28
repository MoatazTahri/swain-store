package com.example.pricingservice.propertiesConfiguration;

import com.example.pricingservice.enumeration.Currency;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "pricing")
@Getter
@Setter
public class CurrencyProperties {
    @Setter(AccessLevel.NONE)
    private final Currency defaultCurrency = Currency.USD;
    private Currency currentCurrency = Currency.USD;
    private double currencyExchangeRate = 1.0;
}
