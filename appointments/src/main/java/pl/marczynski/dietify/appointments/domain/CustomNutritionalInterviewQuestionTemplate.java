package pl.marczynski.dietify.appointments.domain;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A CustomNutritionalInterviewQuestionTemplate.
 */
@Entity
@Table(name = "cust_nutr_intr_quest_tmpl")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CustomNutritionalInterviewQuestionTemplate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Id of owner User entity retrieved from gateway service
     */
    @NotNull
    @ApiModelProperty(value = "Id of owner User entity retrieved from gateway service", required = true)
    @Column(name = "owner_id", nullable = false)
    private Long ownerId;

    /**
     * Custom question extending Nutritional Interview
     */
    
    @ApiModelProperty(value = "Custom question extending Nutritional Interview", required = true)
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "question", nullable = false)
    private String question;

    /**
     * Language of translation as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language of translation as ISO_639-1 code", required = true)
    @Column(name = "language", length = 2, nullable = false)
    private String language;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomNutritionalInterviewQuestionTemplate)) {
            return false;
        }
        return id != null && id.equals(((CustomNutritionalInterviewQuestionTemplate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CustomNutritionalInterviewQuestionTemplate{" +
            "id=" + getId() +
            ", ownerId=" + getOwnerId() +
            ", question='" + getQuestion() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
