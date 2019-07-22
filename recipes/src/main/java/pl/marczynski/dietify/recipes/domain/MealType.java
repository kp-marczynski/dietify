package pl.marczynski.dietify.recipes.domain;
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
 * A MealType.
 */
@Entity
@Table(name = "meal_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "mealtype")
public class MealType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * English name of meal type
     */
    @NotNull
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "English name of meal type", required = true)
    @Column(name = "name", length = 255, nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "mealType")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MealTypeTranslation> translations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<MealTypeTranslation> getTranslations() {
        return translations;
    }

    public void setTranslations(Set<MealTypeTranslation> mealTypeTranslations) {
        this.translations = mealTypeTranslations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MealType)) {
            return false;
        }
        return id != null && id.equals(((MealType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MealType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
