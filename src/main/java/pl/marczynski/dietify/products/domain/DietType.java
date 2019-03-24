package pl.marczynski.dietify.products.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A tag specifying characteristic feature of object to which it is applied.
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "A tag specifying characteristic feature of object to which it is applied. @author Krzysztof Marczyński")
@Entity
@Table(name = "diet_type")
public class DietType implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Short description of Tag in Polish
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short description of Tag in Polish", required = true)
    @Column(name = "name_polish", nullable = false)
    private String namePolish;

    /**
     * Short description of Tag in Polish
     */
    @NotNull
    @Size(min = 1)
    @ApiModelProperty(value = "Short description of Tag in Polish", required = true)
    @Column(name = "name_english", nullable = false)
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

    public DietType namePolish(String namePolish) {
        this.namePolish = namePolish;
        return this;
    }

    public void setNamePolish(String namePolish) {
        this.namePolish = namePolish;
    }

    public String getNameEnglish() {
        return nameEnglish;
    }

    public DietType nameEnglish(String nameEnglish) {
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
        DietType dietType = (DietType) o;
        if (dietType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dietType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DietType{" +
            "id=" + getId() +
            ", namePolish='" + getNamePolish() + "'" +
            ", nameEnglish='" + getNameEnglish() + "'" +
            "}";
    }
}
