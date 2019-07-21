package pl.marczynski.dietify.products.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A definitions of nutritions.
 * Data retrieved form USDA Standard Reference database. Data set is not planned to be expanded.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A definitions of nutritions. Data retrieved form USDA Standard Reference database. Data set is not planned to be expanded. @author Krzysztof Marczyński")
@Entity
@Table(name = "nutrition_definition")
public class NutritionDefinition implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Short tagname of nutrient.
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short tagname of nutrient.", required = true)
    @Column(name = "tagname", nullable = false)
    private String tagname;

    /**
     * Short description of nutrient in Polish
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short description of nutrient in Polish", required = true)
    @Column(name = "description_polish", nullable = false)
    private String descriptionPolish;

    /**
     * Short description of nutrient in English
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short description of nutrient in English", required = true)
    @Column(name = "description_english", nullable = false)
    private String descriptionEnglish;

    /**
     * Unit used for nutrient measurment,
     * e.g. \"g\", \"kcal\", \"ml\"
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Unit used for nutrient measurment, e.g. \"g\", \"kcal\", \"ml\"", required = true)
    @Column(name = "units", nullable = false)
    private String units;

    /**
     * Decimal places to which nutrient value should be rounded
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Decimal places to which nutrient value should be rounded", required = true)
    @Column(name = "decimal_places", nullable = false)
    private Integer decimalPlaces;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTagname() {
        return tagname;
    }

    public NutritionDefinition tagname(String tagname) {
        this.tagname = tagname;
        return this;
    }

    public void setTagname(String tagname) {
        this.tagname = tagname;
    }

    public String getDescriptionPolish() {
        return descriptionPolish;
    }

    public NutritionDefinition descriptionPolish(String descriptionPolish) {
        this.descriptionPolish = descriptionPolish;
        return this;
    }

    public void setDescriptionPolish(String descriptionPolish) {
        this.descriptionPolish = descriptionPolish;
    }

    public String getDescriptionEnglish() {
        return descriptionEnglish;
    }

    public NutritionDefinition descriptionEnglish(String descriptionEnglish) {
        this.descriptionEnglish = descriptionEnglish;
        return this;
    }

    public void setDescriptionEnglish(String descriptionEnglish) {
        this.descriptionEnglish = descriptionEnglish;
    }

    public String getUnits() {
        return units;
    }

    public NutritionDefinition units(String units) {
        this.units = units;
        return this;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public Integer getDecimalPlaces() {
        return decimalPlaces;
    }

    public NutritionDefinition decimalPlaces(Integer decimalPlaces) {
        this.decimalPlaces = decimalPlaces;
        return this;
    }

    public void setDecimalPlaces(Integer decimalPlaces) {
        this.decimalPlaces = decimalPlaces;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        NutritionDefinition nutritionDefinition = (NutritionDefinition) o;
        if (nutritionDefinition.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nutritionDefinition.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NutritionDefinition{" +
            "id=" + getId() +
            ", tagname='" + getTagname() + "'" +
            ", descriptionPolish='" + getDescriptionPolish() + "'" +
            ", descriptionEnglish='" + getDescriptionEnglish() + "'" +
            ", units='" + getUnits() + "'" +
            ", decimalPlaces=" + getDecimalPlaces() +
            "}";
    }
}
