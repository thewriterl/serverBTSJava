package films.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SpokenLanguages.
 */
@Entity
@Table(name = "spoken_languages")
public class SpokenLanguages implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public SpokenLanguages countryCode(String countryCode) {
        this.countryCode = countryCode;
        return this;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getName() {
        return name;
    }

    public SpokenLanguages name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
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
        SpokenLanguages spokenLanguages = (SpokenLanguages) o;
        if (spokenLanguages.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), spokenLanguages.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SpokenLanguages{" +
            "id=" + getId() +
            ", countryCode='" + getCountryCode() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
