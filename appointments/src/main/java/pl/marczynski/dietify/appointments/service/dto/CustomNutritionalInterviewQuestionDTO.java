package pl.marczynski.dietify.appointments.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestion} entity.
 */
public class CustomNutritionalInterviewQuestionDTO implements Serializable {

    private Long id;

    /**
     * Ordinal number of custom question
     */
    @Min(value = 1)
    @ApiModelProperty(value = "Ordinal number of custom question")
    private Integer ordinalNumber;

    /**
     * Custom question extending Nutritional Interview
     */
    
    @ApiModelProperty(value = "Custom question extending Nutritional Interview", required = true)
    @Lob
    private String question;

    /**
     * Answer for question
     */
    @ApiModelProperty(value = "Answer for question")
    @Lob
    private String answer;


    private Long nutritionalInterviewId;

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

    public Long getNutritionalInterviewId() {
        return nutritionalInterviewId;
    }

    public void setNutritionalInterviewId(Long nutritionalInterviewId) {
        this.nutritionalInterviewId = nutritionalInterviewId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomNutritionalInterviewQuestionDTO customNutritionalInterviewQuestionDTO = (CustomNutritionalInterviewQuestionDTO) o;
        if (customNutritionalInterviewQuestionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customNutritionalInterviewQuestionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomNutritionalInterviewQuestionDTO{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", question='" + getQuestion() + "'" +
            ", answer='" + getAnswer() + "'" +
            ", nutritionalInterview=" + getNutritionalInterviewId() +
            "}";
    }
}
