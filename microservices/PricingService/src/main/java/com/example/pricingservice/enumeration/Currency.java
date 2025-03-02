package com.example.pricingservice.enumeration;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Currency {
    AED("United Arab Emirates Dirham", "AE", "د.إ"),
    AFN("Afghan Afghani", "AF", "؋"),
    ALL("Albanian Lek", "AL", "L"),
    AMD("Armenian Dram", "AM", "֏"),
    ANG("Netherlands Antillean Guilder", "AN", "ƒ"),
    AOA("Angolan Kwanza", "AO", "Kz"),
    ARS("Argentine Peso", "AR", "$"),
    AUD("Australian Dollar", "AU", "$"),
    AWG("Aruban Florin", "AW", "ƒ"),
    AZN("Azerbaijani Manat", "AZ", "₼"),
    BAM("Bosnia-Herzegovina Convertible Mark", "BA", "KM"),
    BBD("Barbadian Dollar", "BB", "$"),
    BDT("Bangladeshi Taka", "BD", "৳"),
    BGN("Bulgarian Lev", "BG", "лв"),
    BHD("Bahraini Dinar", "BH", "ب.د"),
    BIF("Burundian Franc", "BI", "FBu"),
    BMD("Bermudian Dollar", "BM", "$"),
    BND("Brunei Dollar", "BN", "$"),
    BOB("Bolivian Boliviano", "BO", "Bs."),
    BRL("Brazilian Real", "BR", "R$"),
    BSD("Bahamian Dollar", "BS", "$"),
    BTN("Bhutanese Ngultrum", "BT", "Nu."),
    BWP("Botswana Pula", "BW", "P"),
    BYN("Belarusian Ruble", "BY", "Br"),
    BZD("Belize Dollar", "BZ", "$"),
    CAD("Canadian Dollar", "CA", "$"),
    CDF("Congolese Franc", "CD", "FC"),
    CHF("Swiss Franc", "CH", "CHF"),
    CLP("Chilean Peso", "CL", "$"),
    CNY("Chinese Yuan", "CN", "¥"),
    COP("Colombian Peso", "CO", "$"),
    CRC("Costa Rican Colón", "CR", "₡"),
    CUP("Cuban Peso", "CU", "$"),
    CVE("Cape Verdean Escudo", "CV", "$"),
    CZK("Czech Koruna", "CZ", "Kč"),
    DJF("Djiboutian Franc", "DJ", "Fdj"),
    DKK("Danish Krone", "DK", "kr"),
    DOP("Dominican Peso", "DO", "$"),
    DZD("Algerian Dinar", "DZ", "د.ج"),
    EGP("Egyptian Pound", "EG", "£"),
    ERN("Eritrean Nakfa", "ER", "Nfk"),
    ETB("Ethiopian Birr", "ET", "Br"),
    EUR("Euro", "EU", "€"),
    FJD("Fijian Dollar", "FJ", "$"),
    FKP("Falkland Islands Pound", "FK", "£"),
    FOK("Faroese Króna", "FO", "kr"),
    GBP("British Pound Sterling", "GB", "£"),
    GEL("Georgian Lari", "GE", "₾"),
    GGP("Guernsey Pound", "GG", "£"),
    GHS("Ghanaian Cedi", "GH", "₵"),
    GIP("Gibraltar Pound", "GI", "£"),
    GMD("Gambian Dalasi", "GM", "D"),
    GNF("Guinean Franc", "GN", "FG"),
    GTQ("Guatemalan Quetzal", "GT", "Q"),
    GYD("Guyanese Dollar", "GY", "$"),
    HKD("Hong Kong Dollar", "HK", "$"),
    HNL("Honduran Lempira", "HN", "L"),
    HRK("Croatian Kuna", "HR", "kn"),
    HTG("Haitian Gourde", "HT", "G"),
    HUF("Hungarian Forint", "HU", "Ft"),
    IDR("Indonesian Rupiah", "ID", "Rp"),
    ILS("Israeli New Shekel", "PS", "₪"),
    IMP("Isle of Man Pound", "IM", "£"),
    INR("Indian Rupee", "IN", "₹"),
    IQD("Iraqi Dinar", "IQ", "ع.د"),
    IRR("Iranian Rial", "IR", "﷼"),
    ISK("Icelandic Króna", "IS", "kr"),
    JMD("Jamaican Dollar", "JM", "$"),
    JOD("Jordanian Dinar", "JO", "د.ا"),
    JPY("Japanese Yen", "JP", "¥"),
    KES("Kenyan Shilling", "KE", "Sh"),
    KGS("Kyrgyzstani Som", "KG", "лв"),
    KHR("Cambodian Riel", "KH", "៛"),
    KID("Kiribati Dollar", "KI", "$"),
    KMF("Comorian Franc", "KM", "CF"),
    KRW("South Korean Won", "KR", "₩"),
    KWD("Kuwaiti Dinar", "KW", "د.ك"),
    KYD("Cayman Islands Dollar", "KY", "$"),
    KZT("Kazakhstani Tenge", "KZ", "₸"),
    LAK("Lao Kip", "LA", "₭"),
    LBP("Lebanese Pound", "LB", "ل.ل"),
    LKR("Sri Lankan Rupee", "LK", "₨"),
    LRD("Liberian Dollar", "LR", "$"),
    LSL("Lesotho Loti", "LS", "L"),
    LYD("Libyan Dinar", "LY", "ل.د"),
    MAD("Moroccan Dirham", "MA", "د.م."),
    MDL("Moldovan Leu", "MD", "L"),
    MGA("Malagasy Ariary", "MG", "Ar"),
    MKD("Macedonian Denar", "MK", "ден"),
    MMK("Myanmar Kyat", "MM", "K"),
    MNT("Mongolian Tugrik", "MN", "₮"),
    MOP("Macanese Pataca", "MO", "P"),
    MRU("Mauritanian Ouguiya", "MR", "UM"),
    MUR("Mauritian Rupee", "MU", "₨"),
    MVR("Maldivian Rufiyaa", "MV", "Rf"),
    MWK("Malawian Kwacha", "MW", "MK"),
    MXN("Mexican Peso", "MX", "$"),
    MYR("Malaysian Ringgit", "MY", "RM"),
    MZN("Mozambican Metical", "MZ", "MT"),
    NAD("Namibian Dollar", "NA", "$"),
    NGN("Nigerian Naira", "NG", "₦"),
    NIO("Nicaraguan Córdoba", "NI", "C$"),
    NOK("Norwegian Krone", "NO", "kr"),
    NPR("Nepalese Rupee", "NP", "₨"),
    NZD("New Zealand Dollar", "NZ", "$"),
    OMR("Omani Rial", "OM", "ر.ع."),
    PAB("Panamanian Balboa", "PA", "B/."),
    PEN("Peruvian Sol", "PE", "S/"),
    PGK("Papua New Guinean Kina", "PG", "K"),
    PHP("Philippine Peso", "PH", "₱"),
    PKR("Pakistani Rupee", "PK", "₨"),
    PLN("Polish Zloty", "PL", "zł"),
    PYG("Paraguayan Guaraní", "PY", "₲"),
    QAR("Qatari Riyal", "QA", "ر.ق"),
    RON("Romanian Leu", "RO", "lei"),
    RSD("Serbian Dinar", "RS", "дин"),
    RUB("Russian Ruble", "RU", "₽"),
    RWF("Rwandan Franc", "RW", "RF"),
    SAR("Saudi Riyal", "SA", "ر.س"),
    SBD("Solomon Islands Dollar", "SB", "$"),
    SCR("Seychellois Rupee", "SC", "₨"),
    SDG("Sudanese Pound", "SD", "ج.س."),
    SEK("Swedish Krona", "SE", "kr"),
    SGD("Singapore Dollar", "SG", "$"),
    SHP("Saint Helena Pound", "SH", "£"),
    SLL("Sierra Leonean Leone", "SL", "Le"),
    SOS("Somali Shilling", "SO", "Sh"),
    SRD("Surinamese Dollar", "SR", "$"),
    SSP("South Sudanese Pound", "SS", "£"),
    STN("São Tomé and Príncipe Dobra", "ST", "Db"),
    SYP("Syrian Pound", "SY", "£"),
    SZL("Swazi Lilangeni", "SZ", "L"),
    THB("Thai Baht", "TH", "฿"),
    TJS("Tajikistani Somoni", "TJ", "ЅМ"),
    TMT("Turkmenistani Manat", "TM", "m"),
    TND("Tunisian Dinar", "TN", "د.ت"),
    TOP("Tongan Paʻanga", "TO", "T$"),
    TRY("Turkish Lira", "TR", "₺"),
    TTD("Trinidad and Tobago Dollar", "TT", "$"),
    TVD("Tuvaluan Dollar", "TV", "$"),
    TWD("New Taiwan Dollar", "TW", "NT$"),
    TZS("Tanzanian Shilling", "TZ", "Sh"),
    UAH("Ukrainian Hryvnia", "UA", "₴"),
    UGX("Ugandan Shilling", "UG", "Sh"),
    USD("United States Dollar", "US", "$"),
    UYU("Uruguayan Peso", "UY", "$"),
    UZS("Uzbekistani Som", "UZ", "сум"),
    VES("Venezuelan Bolívar Soberano", "VE", "Bs."),
    VND("Vietnamese Dong", "VN", "₫"),
    VUV("Vanuatu Vatu", "VU", "Vt"),
    WST("Samoan Tala", "WS", "T"),
    XAF("Central African CFA Franc", "CF", "FCFA"),
    XCD("East Caribbean Dollar", "AG", "$"),
    XOF("West African CFA Franc", "SN", "CFA"),
    XPF("CFP Franc", "PF", "₣"),
    YER("Yemeni Rial", "YE", "﷼"),
    ZAR("South African Rand", "ZA", "R"),
    ZMW("Zambian Kwacha", "ZM", "ZK"),
    ZWL("Zimbabwean Dollar", "ZW", "Z$");

    private final String description;

    private final String alpha2Code;

    private final String symbol;

    @JsonGetter
    public JsonNode getCurrency() {
        return JsonNodeFactory.instance.objectNode().put("name", this.name()).put("code", alpha2Code).put("symbol", symbol).put("description", description);
    }
}
