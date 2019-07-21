package pl.marczynski.dietify.gateway.service.dto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link pl.marczynski.dietify.gateway.domain.LandingPageCard} entity.
 */
@ApiModel(description = "Landing page information @author Krzysztof Marczyński")
public class LandingPageCardDTO implements Serializable {

    private Long id;

    /**
     * Number for specifying order in which content should appear on landing page
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Number for specifying order in which content should appear on landing page", required = true)
    private Integer ordinalNumber;

    /**
     * Landing page card content in form of simple string or html code. Bootrstrap and Font Awesome may be used to style content
     */
    
    @ApiModelProperty(value = "Landing page card content in form of simple string or html code. Bootrstrap and Font Awesome may be used to style content", required = true)
    @Lob
    private String htmlContent;


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

    public String getHtmlContent() {
        return htmlContent;
    }

    public void setHtmlContent(String htmlContent) {
        this.htmlContent = htmlContent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LandingPageCardDTO landingPageCardDTO = (LandingPageCardDTO) o;
        if (landingPageCardDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), landingPageCardDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LandingPageCardDTO{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", htmlContent='" + getHtmlContent() + "'" +
            "}";
    }
}
