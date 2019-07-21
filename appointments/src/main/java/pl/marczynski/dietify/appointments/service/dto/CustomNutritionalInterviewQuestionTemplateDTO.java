package pl.marczynski.dietify.appointments.service.dto;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestionTemplate} entity.
 */
public class CustomNutritionalInterviewQuestionTemplateDTO implements Serializable {

    private Long id;

    /**
     * Id of owner User entity retrieved from gateway service
     */
    @NotNull
    @ApiModelProperty(value = "Id of owner User entity retrieved from gateway service", required = true)
    private Long ownerId;

    /**
     * Custom question extending Nutritional Interview
     */
    
    @ApiModelProperty(value = "Custom question extending Nutritional Interview", required = true)
    @Lob
    private String question;

    /**
     * Language of translation as ISO_639-1 code
     */
    @NotNull
    @Size(min = 2, max = 2)
    @ApiModelProperty(value = "Language of translation as ISO_639-1 code", required = true)
    private String language;


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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomNutritionalInterviewQuestionTemplateDTO customNutritionalInterviewQuestionTemplateDTO = (CustomNutritionalInterviewQuestionTemplateDTO) o;
        if (customNutritionalInterviewQuestionTemplateDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customNutritionalInterviewQuestionTemplateDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomNutritionalInterviewQuestionTemplateDTO{" +
            "id=" + getId() +
            ", ownerId=" + getOwnerId() +
            ", question='" + getQuestion() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
