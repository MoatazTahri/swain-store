package com.example.pricingservice.service;

import com.example.pricingservice.entity.Pricing;
import com.example.pricingservice.enumeration.Currency;
import com.example.pricingservice.exception.PricingNotFound;
import com.example.pricingservice.mapper.PricingMapper;
import com.example.pricingservice.model.PricingRequest;
import com.example.pricingservice.model.PricingResponse;
import com.example.pricingservice.model.ProductRequest;
import com.example.pricingservice.propertiesConfiguration.CurrencyProperties;
import com.example.pricingservice.repository.PricingRepository;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Log4j2
@Service
@AllArgsConstructor
public class PricingServiceImpl implements PricingService {

    private static final String CURRENCY_API_KEY = "fca_live_zw6FfBSAEliSvfXIYY6Wh1grUspCvYoOa6RkGJVT";

    private static final String CURRENCY_API_URI = "https://api.currencyapi.com/v3/latest";

    private final PricingRepository pricingRepository;

    private WebClient webClient;

    private CurrencyProperties currencyProperties;

    @Override
    public void createPricing(PricingRequest pricingRequest) {
        pricingRepository.save(PricingMapper.toPricing(pricingRequest));
        log.info("Pricing created");
    }

    @Override
    public PricingResponse getPricingBySkuCode(String skuCode) {
        Pricing pricing = pricingRepository.findBySkuCode(skuCode);
        if (pricing == null) {
            log.error("Pricing not found for product {}", skuCode);
            throw new PricingNotFound("Pricing not found for product " + skuCode);
        }
        return mapToPricingResponse(pricingRepository.findBySkuCode(skuCode));
    }

    @Override
    public List<PricingResponse> getPricingBySkuCodes(List<String> skuCodes) {
        return pricingRepository.findBySkuCodeIn(skuCodes)
                .stream()
                .map(this::mapToPricingResponse)
                .toList();
    }

    @Override
    public List<PricingResponse> getAllPricing() {
        return pricingRepository.findAll().stream()
                .map(this::mapToPricingResponse)
                .toList();
    }

    @SneakyThrows
    @Override
    public double convertCurrency(Currency baseCurrency, Currency targetCurrency) {
        String result = webClient.get()
                .uri(CURRENCY_API_URI + "?apikey=" + CURRENCY_API_KEY + "&base_currency=" + baseCurrency + "&currencies=" + targetCurrency)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        if (targetCurrency.equals(baseCurrency)) {
            log.info("Currency reset to default : {}", targetCurrency);
        }
        else log.info("Currency converted from {} to {}", baseCurrency, targetCurrency);
        return parseCurrencyValue(result, targetCurrency);
    }

    @Override
    public double totalPricing(List<ProductRequest> products) {
        List<String> skuCodes = products.stream()
                .map(ProductRequest::getSkuCode)
                .toList();
        List<Pricing> productsPricing = pricingRepository.findBySkuCodeIn(skuCodes);
        double totalPrice = 0;
        for (int i = 0; i < products.size(); i++) {
            totalPrice += products.get(i).getQuantity() * productsPricing.get(i).getUnitPrice();
        }
        return totalPrice;
    }

    private double parseCurrencyValue(String jsonResult, Currency targetCurrency) throws JSONException {
        JSONObject jsonObject = new JSONObject(jsonResult);
        return jsonObject.getJSONObject("data")
                .getJSONObject(targetCurrency.name())
                .getDouble("value");
    }

    private PricingResponse mapToPricingResponse(Pricing pricing) {
        PricingResponse pricingResponse = new PricingResponse();
        pricingResponse.setSkuCode(pricing.getSkuCode());
        pricingResponse.setUnitPrice(pricing.getUnitPrice() * currencyProperties.getCurrencyExchangeRate());
        return pricingResponse;
    }
}
