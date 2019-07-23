package pl.marczynski.dietify.products.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A NutritionDefinitionTranslation.
 */
@Entity
@Table(name = "nutr_def_trns")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "nutritiondefinitiontranslation")
public class NutritionDefinitionTranslation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Translated description of nutrition definition
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Translated description of nutrition definition", required = true)
    @Column(name = "translation", length = 255, nullable = false)
    private String translation;

    /**
     * Language of translation as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language of translation as ISO_639-1 code", required = true)
    @Column(name = "language", length = 2, nullable = false)
    private String language;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("translations")
    private NutritionDefinition nutritionDefinition;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public NutritionDefinition getNutritionDefinition() {
        return nutritionDefinition;
    }

    public void setNutritionDefinition(NutritionDefinition nutritionDefinition) {
        this.nutritionDefinition = nutritionDefinition;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NutritionDefinitionTranslation)) {
            return false;
        }
        return id != null && id.equals(((NutritionDefinitionTranslation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NutritionDefinitionTranslation{" +
            "id=" + getId() +
            ", translation='" + getTranslation() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
