package pl.marczynski.dietify.recipes.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A DishTypeTranslation.
 */
@Entity
@Table(name = "dish_type_trns")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "dishtypetranslation")
public class DishTypeTranslation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Translated name of dish type
     */
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "translation", length = 255, nullable = false)
    private String translation;

    /**
     * Language of translation as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @Column(name = "language", length = 2, nullable = false)
    private String language;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("translations")
    private DishType dishType;

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

    public DishType getDishType() {
        return dishType;
    }

    public void setDishType(DishType dishType) {
        this.dishType = dishType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DishTypeTranslation)) {
            return false;
        }
        return id != null && id.equals(((DishTypeTranslation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DishTypeTranslation{" +
            "id=" + getId() +
            ", translation='" + getTranslation() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
