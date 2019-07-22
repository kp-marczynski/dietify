package pl.marczynski.dietify.products.domain;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NutritionDefinition.
 */
@Entity
@Table(name = "nutrition_definition")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "nutritiondefinition")
public class NutritionDefinition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Short tag name of nutrient
     */
    @NotNull
    @Size(min = 1, max = 20)
    @ApiModelProperty(value = "Short tag name of nutrient", required = true)
    @Column(name = "tag", length = 20, nullable = false, unique = true)
    private String tag;

    /**
     * Short description of nutrient in English
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Short description of nutrient in English", required = true)
    @Column(name = "description", length = 255, nullable = false)
    private String description;

    /**
     * Unit used for nutrient measurement, e.g. \"g\", \"kcal\", \"ml\"
     */
    @NotNull
    @Size(min = 1, max = 10)
    @ApiModelProperty(value = "Unit used for nutrient measurement, e.g. \"g\", \"kcal\", \"ml\"", required = true)
    @Column(name = "units", length = 10, nullable = false)
    private String units;

    /**
     * Decimal places to which nutrient value should be rounded
     */
    @NotNull
    @Min(value = 0)
    @ApiModelProperty(value = "Decimal places to which nutrient value should be rounded", required = true)
    @Column(name = "decimal_places", nullable = false)
    private Integer decimalPlaces;

    @OneToMany(mappedBy = "nutritionDefinition")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<NutritionDefinitionTranslation> translations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public Integer getDecimalPlaces() {
        return decimalPlaces;
    }

    public void setDecimalPlaces(Integer decimalPlaces) {
        this.decimalPlaces = decimalPlaces;
    }

    public Set<NutritionDefinitionTranslation> getTranslations() {
        return translations;
    }

    public void setTranslations(Set<NutritionDefinitionTranslation> nutritionDefinitionTranslations) {
        this.translations = nutritionDefinitionTranslations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NutritionDefinition)) {
            return false;
        }
        return id != null && id.equals(((NutritionDefinition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NutritionDefinition{" +
            "id=" + getId() +
            ", tag='" + getTag() + "'" +
            ", description='" + getDescription() + "'" +
            ", units='" + getUnits() + "'" +
            ", decimalPlaces=" + getDecimalPlaces() +
            "}";
    }
}
