package pl.marczynski.dietify.appointments.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A OwnedKitchenAppliance.
 */
@Entity
@Table(name = "owned_kitchen_appliance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OwnedKitchenAppliance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Id of KitchenAppliance entity retrieved from recipes service
     */
    @NotNull
    @Column(name = "kitchen_appliance_id", nullable = false)
    private Long kitchenApplianceId;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("ownedKitchenAppliances")
    private NutritionalInterview nutritionalInterview;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getKitchenApplianceId() {
        return kitchenApplianceId;
    }

    public void setKitchenApplianceId(Long kitchenApplianceId) {
        this.kitchenApplianceId = kitchenApplianceId;
    }

    public NutritionalInterview getNutritionalInterview() {
        return nutritionalInterview;
    }

    public void setNutritionalInterview(NutritionalInterview nutritionalInterview) {
        this.nutritionalInterview = nutritionalInterview;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OwnedKitchenAppliance)) {
            return false;
        }
        return id != null && id.equals(((OwnedKitchenAppliance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OwnedKitchenAppliance{" +
            "id=" + getId() +
            ", kitchenApplianceId=" + getKitchenApplianceId() +
            "}";
    }
}
