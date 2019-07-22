package pl.marczynski.dietify.appointments.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A CustomNutritionalInterviewQuestion.
 */
@Entity
@Table(name = "cust_nutr_intr_quest")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CustomNutritionalInterviewQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Ordinal number of custom question
     */
    @Min(value = 1)
    @ApiModelProperty(value = "Ordinal number of custom question")
    @Column(name = "ordinal_number")
    private Integer ordinalNumber;

    /**
     * Custom question extending Nutritional Interview
     */
    
    @ApiModelProperty(value = "Custom question extending Nutritional Interview", required = true)
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "question", nullable = false)
    private String question;

    /**
     * Answer for question
     */
    @ApiModelProperty(value = "Answer for question")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "answer")
    private String answer;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("customQuestions")
    private NutritionalInterview nutritionalInterview;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(Integer ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
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
        if (!(o instanceof CustomNutritionalInterviewQuestion)) {
            return false;
        }
        return id != null && id.equals(((CustomNutritionalInterviewQuestion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CustomNutritionalInterviewQuestion{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", question='" + getQuestion() + "'" +
            ", answer='" + getAnswer() + "'" +
            "}";
    }
}
