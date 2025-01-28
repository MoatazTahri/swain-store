package com.example.pricingservice.controller;

import com.example.pricingservice.enumeration.Currency;
import com.example.pricingservice.model.PricingRequest;
import com.example.pricingservice.model.PricingResponse;
import com.example.pricingservice.model.ProductRequest;
import com.example.pricingservice.propertiesConfiguration.CurrencyProperties;
import com.example.pricingservice.service.PricingService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pricing")
@AllArgsConstructor
public class PricingController {

    private CurrencyProperties currencyProperties;

    private final PricingService pricingService;

    @GetMapping("/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public PricingResponse getPricing(@PathVariable("skuCode") String skuCode) {
        return pricingService.getPricingBySkuCode(skuCode);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PricingResponse> getPricingOf(@RequestParam List<String> skuCodes) {
        return pricingService.getPricingBySkuCodes(skuCodes);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<PricingResponse> getAllPricing() {
        return pricingService.getAllPricing();
    }

    @GetMapping("current-currency")
    @ResponseStatus(HttpStatus.OK)
    public JsonNode getActualCurrency() {
        return currencyProperties.getCurrentCurrency().getCurrency();
    }

    @PostMapping("change-currency/{currency}")
    @ResponseStatus(HttpStatus.OK)
    public JsonNode changeActualCurrency(@PathVariable Currency currency) {
        currencyProperties.setCurrentCurrency(currency);
        Currency defaultCurrency = currencyProperties.getDefaultCurrency();
        Currency curentCurrency = currencyProperties.getCurrentCurrency();
        double currencyExchangeRate = pricingService.convertCurrency(defaultCurrency, curentCurrency);
        currencyProperties.setCurrencyExchangeRate(currencyExchangeRate);
        return currency.getCurrency();
    }

    @GetMapping("/all-currencies")
    @ResponseStatus(HttpStatus.OK)
    public List<JsonNode> getAllCurrencies() {
        return Arrays.stream(Currency.values()).map(Currency::getCurrency).toList();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createPricing(@RequestBody PricingRequest pricingRequest) {
        pricingService.createPricing(pricingRequest);
    }

    @GetMapping("/convert")
    @ResponseStatus(HttpStatus.OK)
    public double convertPrice(@RequestParam(required = false) Double price, @RequestParam Currency fromCurrency, @RequestParam Currency toCurrency) {
        if (price == null) {
            return pricingService.convertCurrency(fromCurrency, toCurrency);
        }
        return price * pricingService.convertCurrency(fromCurrency, toCurrency);
    }

    @GetMapping("/total-price")
    @ResponseStatus(HttpStatus.OK)
    public double calculateTotalPrice(@RequestBody List<ProductRequest> productRequests) {
        return pricingService.totalPricing(productRequests);
    }
}
