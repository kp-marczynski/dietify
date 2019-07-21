package pl.marczynski.dietify.mealplans.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link pl.marczynski.dietify.mealplans.domain.MealProduct} entity.
 */
public class MealProductDTO implements Serializable {

    private Long id;

    /**
     * Id of Product entity retrieved from Products service
     */
    @NotNull
    @ApiModelProperty(value = "Id of Product entity retrieved from Products service", required = true)
    private Long productId;

    /**
     * Id of HouseholdMeasure entity retrieved from Products service
     */
    @ApiModelProperty(value = "Id of HouseholdMeasure entity retrieved from Products service")
    private Long householdMeasureId;

    /**
     * Amount of Product in household measure units. If household measure is null then amount is in grams.
     */
    @NotNull
    @DecimalMin(value = "0")
    @ApiModelProperty(value = "Amount of Product in household measure units. If household measure is null then amount is in grams.", required = true)
    private Double amount;


    private Long mealId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MealProductDTO mealProductDTO = (MealProductDTO) o;
        if (mealProductDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealProductDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealProductDTO{" +
            "id=" + getId() +
            ", productId=" + getProductId() +
            ", householdMeasureId=" + getHouseholdMeasureId() +
            ", amount=" + getAmount() +
            ", meal=" + getMealId() +
            "}";
    }
}
