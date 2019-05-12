package pl.marczynski.dietify.products.service.dto;

public class BasicNutritionRequestDTO {
    private Long productId;
    private Long householdMeasureId;
    private Long amount;

    public BasicNutritionRequestDTO() {
    }

    public BasicNutritionRequestDTO(Long productId, Long householdMeasureId, Long amount) {
        this.productId = productId;
        this.householdMeasureId = householdMeasureId;
        this.amount = amount;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getHouseholdMeasureId() {
        return householdMeasureId;
    }

    public void setHouseholdMeasureId(Long householdMeasureId) {
        this.householdMeasureId = householdMeasureId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
