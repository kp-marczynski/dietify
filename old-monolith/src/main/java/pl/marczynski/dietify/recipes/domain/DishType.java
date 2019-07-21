package pl.marczynski.dietify.recipes.domain;


import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DishType. For example salat or soup
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A DishType. For example salat or soup @author Krzysztof Marczyński")
@Entity
@Table(name = "dish_type")
public class DishType implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1)
    @Column(name = "description_polish")
    private String descriptionPolish;

    @Size(min = 1)
    @Column(name = "description_english")
    private String descriptionEnglish;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescriptionPolish() {
        return descriptionPolish;
    }

    public DishType descriptionPolish(String descriptionPolish) {
        this.descriptionPolish = descriptionPolish;
        return this;
    }

    public void setDescriptionPolish(String descriptionPolish) {
        this.descriptionPolish = descriptionPolish;
    }

    public String getDescriptionEnglish() {
        return descriptionEnglish;
    }

    public DishType descriptionEnglish(String descriptionEnglish) {
        this.descriptionEnglish = descriptionEnglish;
        return this;
    }

    public void setDescriptionEnglish(String descriptionEnglish) {
        this.descriptionEnglish = descriptionEnglish;
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
        DishType dishType = (DishType) o;
        if (dishType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dishType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DishType{" +
            "id=" + getId() +
            ", descriptionPolish='" + getDescriptionPolish() + "'" +
            ", descriptionEnglish='" + getDescriptionEnglish() + "'" +
            "}";
    }
}
