package pl.marczynski.dietify.recipes.domain;


import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MealType. For example breakfast or dinner
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A MealType. For example breakfast or dinner @author Krzysztof Marczyński")
@Entity
@Table(name = "meal_type")
public class MealType implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1)
    @Column(name = "name_polish")
    private String namePolish;

    @Size(min = 1)
    @Column(name = "name_english")
    private String nameEnglish;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamePolish() {
        return namePolish;
    }

    public MealType namePolish(String namePolish) {
        this.namePolish = namePolish;
        return this;
    }

    public void setNamePolish(String namePolish) {
        this.namePolish = namePolish;
    }

    public String getNameEnglish() {
        return nameEnglish;
    }

    public MealType nameEnglish(String nameEnglish) {
        this.nameEnglish = nameEnglish;
        return this;
    }

    public void setNameEnglish(String nameEnglish) {
        this.nameEnglish = nameEnglish;
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
        MealType mealType = (MealType) o;
        if (mealType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mealType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MealType{" +
            "id=" + getId() +
            ", namePolish='" + getNamePolish() + "'" +
            ", nameEnglish='" + getNameEnglish() + "'" +
            "}";
    }
}
