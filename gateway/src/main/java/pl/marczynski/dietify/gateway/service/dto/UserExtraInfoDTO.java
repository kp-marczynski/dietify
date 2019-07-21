package pl.marczynski.dietify.gateway.service.dto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import pl.marczynski.dietify.gateway.domain.enumeration.Gender;

/**
 * A DTO for the {@link pl.marczynski.dietify.gateway.domain.UserExtraInfo} entity.
 */
@ApiModel(description = "Additional information about user @author Krzysztof Marczyński")
public class UserExtraInfoDTO implements Serializable {

    private Long id;

    /**
     * Gender
     */
    @ApiModelProperty(value = "Gender")
    private Gender gender;

    /**
     * Date of birth
     */
    @ApiModelProperty(value = "Date of birth")
    private LocalDate dateOfBirth;

    /**
     * Phone number. Preferably in format (+00) 000-000-000
     */
    @Size(min = 1, max = 50)
    @ApiModelProperty(value = "Phone number. Preferably in format (+00) 000-000-000")
    private String phoneNumber;

    /**
     * Street address with house/apartment number
     */
    @Size(min = 1, max = 255)
    @ApiModelProperty(value = "Street address with house/apartment number")
    private String streetAddress;

    /**
     * Postal or zip code
     */
    @Size(min = 1, max = 20)
    @ApiModelProperty(value = "Postal or zip code")
    private String postalCode;

    /**
     * City
     */
    @Size(min = 1, max = 50)
    @ApiModelProperty(value = "City")
    private String city;

    /**
     * Country
     */
    @Size(min = 1, max = 50)
    @ApiModelProperty(value = "Country")
    private String country;

    /**
     * Short personal description
     */
    @ApiModelProperty(value = "Short personal description")
    @Lob
    private String personalDescription;


    private Long userId;

    private String userLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPersonalDescription() {
        return personalDescription;
    }

    public void setPersonalDescription(String personalDescription) {
        this.personalDescription = personalDescription;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserExtraInfoDTO userExtraInfoDTO = (UserExtraInfoDTO) o;
        if (userExtraInfoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExtraInfoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExtraInfoDTO{" +
            "id=" + getId() +
            ", gender='" + getGender() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            ", personalDescription='" + getPersonalDescription() + "'" +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            "}";
    }
}
