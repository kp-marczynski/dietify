package pl.marczynski.dietify.mealplans.service.dto;

import java.util.List;

public class ShoplistDto {
    public List<ShoplistItemDto> shoplistItems;
    public String recipientEmail;
}

class ShoplistItemDto {
    public Long productId;
    public String productName;
    public Integer amount;
}
