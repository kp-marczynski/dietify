package pl.marczynski.dietify.recipes.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Kitchen appliance definition
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "Kitchen appliance definition @author Krzysztof Marczyński")
@Entity
@Table(name = "kitchen_appliance")
public class KitchenAppliance implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Polish name of kitchen appliance
     */
    @Size(min = 1)
    @ApiModelProperty(value = "Polish name of kitchen appliance")
    @Column(name = "name_polish")
    private String namePolish;

    /**
     * English name of kitchen appliance
     */
    @Size(min = 1)
    @ApiModelProperty(value = "English name of kitchen appliance")
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

    public KitchenAppliance namePolish(String namePolish) {
        this.namePolish = namePolish;
        return this;
    }

    public void setNamePolish(String namePolish) {
        this.namePolish = namePolish;
    }

    public String getNameEnglish() {
        return nameEnglish;
    }

    public KitchenAppliance nameEnglish(String nameEnglish) {
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
        KitchenAppliance kitchenAppliance = (KitchenAppliance) o;
        if (kitchenAppliance.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), kitchenAppliance.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KitchenAppliance{" +
            "id=" + getId() +
            ", namePolish='" + getNamePolish() + "'" +
            ", nameEnglish='" + getNameEnglish() + "'" +
            "}";
    }
}
