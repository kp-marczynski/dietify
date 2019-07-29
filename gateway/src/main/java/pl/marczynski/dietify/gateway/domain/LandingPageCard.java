package pl.marczynski.dietify.gateway.domain;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * Landing page information
 * @author Krzysztof Marczyński
 */
@ApiModel(description = "Landing page information @author Krzysztof Marczyński")
@Entity
@Table(name = "landing_page_card")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "landingpagecard")
public class LandingPageCard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Number for specifying order in which content should appear on landing page
     */
    @NotNull
    @Min(value = 1)
    @ApiModelProperty(value = "Number for specifying order in which content should appear on landing page", required = true)
    @Column(name = "ordinal_number", nullable = false)
    private Integer ordinalNumber;

    /**
     * Landing page card content in form of simple string or html code. Bootstrap and Font Awesome may be used to style content
     */
    
    @ApiModelProperty(value = "Landing page card content in form of simple string or html code. Bootstrap and Font Awesome may be used to style content", required = true)
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "html_content", nullable = false)
    private String htmlContent;

    /**
     * Optional image to be shown beside htmlContent
     */
    @ApiModelProperty(value = "Optional image to be shown beside htmlContent")
    @Lob
    @Column(name = "card_image")
    private byte[] cardImage;

    @Column(name = "card_image_content_type")
    private String cardImageContentType;

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

    public String getHtmlContent() {
        return htmlContent;
    }

    public void setHtmlContent(String htmlContent) {
        this.htmlContent = htmlContent;
    }

    public byte[] getCardImage() {
        return cardImage;
    }

    public void setCardImage(byte[] cardImage) {
        this.cardImage = cardImage;
    }

    public String getCardImageContentType() {
        return cardImageContentType;
    }

    public void setCardImageContentType(String cardImageContentType) {
        this.cardImageContentType = cardImageContentType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LandingPageCard)) {
            return false;
        }
        return id != null && id.equals(((LandingPageCard) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LandingPageCard{" +
            "id=" + getId() +
            ", ordinalNumber=" + getOrdinalNumber() +
            ", htmlContent='" + getHtmlContent() + "'" +
            ", cardImage='" + getCardImage() + "'" +
            ", cardImageContentType='" + getCardImageContentType() + "'" +
            "}";
    }
}
