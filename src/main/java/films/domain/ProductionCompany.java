package films.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ProductionCompany.
 */
@Entity
@Table(name = "production_company")
public class ProductionCompany implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "logo_path")
    private String logoPath;

    @Lob
    @Column(name = "logo_url")
    private byte[] logoURL;

    @Column(name = "logo_url_content_type")
    private String logoURLContentType;

    @Column(name = "name")
    private String name;

    @Column(name = "country")
    private String country;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogoPath() {
        return logoPath;
    }

    public ProductionCompany logoPath(String logoPath) {
        this.logoPath = logoPath;
        return this;
    }

    public void setLogoPath(String logoPath) {
        this.logoPath = logoPath;
    }

    public byte[] getLogoURL() {
        return logoURL;
    }

    public ProductionCompany logoURL(byte[] logoURL) {
        this.logoURL = logoURL;
        return this;
    }

    public void setLogoURL(byte[] logoURL) {
        this.logoURL = logoURL;
    }

    public String getLogoURLContentType() {
        return logoURLContentType;
    }

    public ProductionCompany logoURLContentType(String logoURLContentType) {
        this.logoURLContentType = logoURLContentType;
        return this;
    }

    public void setLogoURLContentType(String logoURLContentType) {
        this.logoURLContentType = logoURLContentType;
    }

    public String getName() {
        return name;
    }

    public ProductionCompany name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public ProductionCompany country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
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
        ProductionCompany productionCompany = (ProductionCompany) o;
        if (productionCompany.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productionCompany.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductionCompany{" +
            "id=" + getId() +
            ", logoPath='" + getLogoPath() + "'" +
            ", logoURL='" + getLogoURL() + "'" +
            ", logoURLContentType='" + getLogoURLContentType() + "'" +
            ", name='" + getName() + "'" +
            ", country='" + getCountry() + "'" +
            "}";
    }
}
