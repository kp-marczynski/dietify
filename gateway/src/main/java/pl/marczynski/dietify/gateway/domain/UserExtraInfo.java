package pl.marczynski.dietify.gateway.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;

import pl.marczynski.dietify.gateway.domain.enumeration.Gender;

/**
 * Additional information about user
 * @author Krzysztof Marczyński
 */
@Entity
@Table(name = "user_extra_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "userextrainfo")
public class UserExtraInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    /**
     * Gender
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    /**
     * Date of birth
     */
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    /**
     * Phone number. Preferably in format (+00) 000-000-000
     */
    @Size(min = 1, max = 50)
    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    /**
     * Street address with house/apartment number
     */
    @Size(min = 1, max = 255)
    @Column(name = "street_address", length = 255)
    private String streetAddress;

    /**
     * Postal or zip code
     */
    @Size(min = 1, max = 20)
    @Column(name = "postal_code", length = 20)
    private String postalCode;

    /**
     * City
     */
    @Size(min = 1, max = 50)
    @Column(name = "city", length = 50)
    private String city;

    /**
     * Country
     */
    @Size(min = 1, max = 50)
    @Column(name = "country", length = 50)
    private String country;

    /**
     * Short personal description
     */
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "personal_description")
    private String personalDescription;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserExtraInfo)) {
            return false;
        }
        return id != null && id.equals(((UserExtraInfo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserExtraInfo{" +
            "id=" + getId() +
            ", gender='" + getGender() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            ", personalDescription='" + getPersonalDescription() + "'" +
            "}";
    }
}
