package pl.marczynski.dietify.recipes.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A RecipeSuitableForDiet.
 */
@Entity
@Table(name = "recipe_suitable_for_diet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "recipesuitablefordiet")
public class RecipeSuitableForDiet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Id of applicable DietType entity retrieved from products service
     */
    @NotNull
    @ApiModelProperty(value = "Id of applicable DietType entity retrieved from products service", required = true)
    @Column(name = "diet_type_id", nullable = false)
    private Long dietTypeId;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("suitableForDiets")
    private Recipe recipe;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDietTypeId() {
        return dietTypeId;
    }

    public void setDietTypeId(Long dietTypeId) {
        this.dietTypeId = dietTypeId;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RecipeSuitableForDiet)) {
            return false;
        }
        return id != null && id.equals(((RecipeSuitableForDiet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RecipeSuitableForDiet{" +
            "id=" + getId() +
            ", dietTypeId=" + getDietTypeId() +
            "}";
    }
}
