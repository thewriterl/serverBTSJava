package films.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Films.
 */
@Entity
@Table(name = "films")
public class Films implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Lob
    @Column(name = "poster", nullable = false)
    private byte[] poster;

    @Column(name = "poster_content_type", nullable = false)
    private String posterContentType;

    @Column(name = "adult")
    private Boolean adult;

    @Column(name = "budget")
    private String budget;

    @Column(name = "popularity")
    private Long popularity;

    @Column(name = "release_date")
    private Instant releaseDate;

    @Column(name = "revenue")
    private Long revenue;

    @Column(name = "runtime")
    private Integer runtime;

    @Column(name = "status")
    private String status;

    @Column(name = "rating")
    private Float rating;

    @ManyToMany
    @JoinTable(name = "films_director",
               joinColumns = @JoinColumn(name="films_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="directors_id", referencedColumnName="id"))
    private Set<Director> directors = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "films_genre",
               joinColumns = @JoinColumn(name="films_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="genres_id", referencedColumnName="id"))
    private Set<Genres> genres = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "films_production_countries",
               joinColumns = @JoinColumn(name="films_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="production_countries_id", referencedColumnName="id"))
    private Set<ProductionCountries> productionCountries = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "films_spoken_languages",
               joinColumns = @JoinColumn(name="films_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="spoken_languages_id", referencedColumnName="id"))
    private Set<SpokenLanguages> spokenLanguages = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "films_posts",
               joinColumns = @JoinColumn(name="films_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="posts_id", referencedColumnName="id"))
    private Set<Posts> posts = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "films_actors",
               joinColumns = @JoinColumn(name="films_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="actors_id", referencedColumnName="id"))
    private Set<Actors> actors = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "films_production_company",
               joinColumns = @JoinColumn(name="films_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="production_companies_id", referencedColumnName="id"))
    private Set<ProductionCompany> productionCompanies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Films title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public byte[] getPoster() {
        return poster;
    }

    public Films poster(byte[] poster) {
        this.poster = poster;
        return this;
    }

    public void setPoster(byte[] poster) {
        this.poster = poster;
    }

    public String getPosterContentType() {
        return posterContentType;
    }

    public Films posterContentType(String posterContentType) {
        this.posterContentType = posterContentType;
        return this;
    }

    public void setPosterContentType(String posterContentType) {
        this.posterContentType = posterContentType;
    }

    public Boolean isAdult() {
        return adult;
    }

    public Films adult(Boolean adult) {
        this.adult = adult;
        return this;
    }

    public void setAdult(Boolean adult) {
        this.adult = adult;
    }

    public String getBudget() {
        return budget;
    }

    public Films budget(String budget) {
        this.budget = budget;
        return this;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public Long getPopularity() {
        return popularity;
    }

    public Films popularity(Long popularity) {
        this.popularity = popularity;
        return this;
    }

    public void setPopularity(Long popularity) {
        this.popularity = popularity;
    }

    public Instant getReleaseDate() {
        return releaseDate;
    }

    public Films releaseDate(Instant releaseDate) {
        this.releaseDate = releaseDate;
        return this;
    }

    public void setReleaseDate(Instant releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Long getRevenue() {
        return revenue;
    }

    public Films revenue(Long revenue) {
        this.revenue = revenue;
        return this;
    }

    public void setRevenue(Long revenue) {
        this.revenue = revenue;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public Films runtime(Integer runtime) {
        this.runtime = runtime;
        return this;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    public String getStatus() {
        return status;
    }

    public Films status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Float getRating() {
        return rating;
    }

    public Films rating(Float rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public Set<Director> getDirectors() {
        return directors;
    }

    public Films directors(Set<Director> directors) {
        this.directors = directors;
        return this;
    }

    public Films addDirector(Director director) {
        this.directors.add(director);
        return this;
    }

    public Films removeDirector(Director director) {
        this.directors.remove(director);
        return this;
    }

    public void setDirectors(Set<Director> directors) {
        this.directors = directors;
    }

    public Set<Genres> getGenres() {
        return genres;
    }

    public Films genres(Set<Genres> genres) {
        this.genres = genres;
        return this;
    }

    public Films addGenre(Genres genres) {
        this.genres.add(genres);
        return this;
    }

    public Films removeGenre(Genres genres) {
        this.genres.remove(genres);
        return this;
    }

    public void setGenres(Set<Genres> genres) {
        this.genres = genres;
    }

    public Set<ProductionCountries> getProductionCountries() {
        return productionCountries;
    }

    public Films productionCountries(Set<ProductionCountries> productionCountries) {
        this.productionCountries = productionCountries;
        return this;
    }

    public Films addProductionCountries(ProductionCountries productionCountries) {
        this.productionCountries.add(productionCountries);
        return this;
    }

    public Films removeProductionCountries(ProductionCountries productionCountries) {
        this.productionCountries.remove(productionCountries);
        return this;
    }

    public void setProductionCountries(Set<ProductionCountries> productionCountries) {
        this.productionCountries = productionCountries;
    }

    public Set<SpokenLanguages> getSpokenLanguages() {
        return spokenLanguages;
    }

    public Films spokenLanguages(Set<SpokenLanguages> spokenLanguages) {
        this.spokenLanguages = spokenLanguages;
        return this;
    }

    public Films addSpokenLanguages(SpokenLanguages spokenLanguages) {
        this.spokenLanguages.add(spokenLanguages);
        return this;
    }

    public Films removeSpokenLanguages(SpokenLanguages spokenLanguages) {
        this.spokenLanguages.remove(spokenLanguages);
        return this;
    }

    public void setSpokenLanguages(Set<SpokenLanguages> spokenLanguages) {
        this.spokenLanguages = spokenLanguages;
    }

    public Set<Posts> getPosts() {
        return posts;
    }

    public Films posts(Set<Posts> posts) {
        this.posts = posts;
        return this;
    }

    public Films addPosts(Posts posts) {
        this.posts.add(posts);
        return this;
    }

    public Films removePosts(Posts posts) {
        this.posts.remove(posts);
        return this;
    }

    public void setPosts(Set<Posts> posts) {
        this.posts = posts;
    }

    public Set<Actors> getActors() {
        return actors;
    }

    public Films actors(Set<Actors> actors) {
        this.actors = actors;
        return this;
    }

    public Films addActors(Actors actors) {
        this.actors.add(actors);
        return this;
    }

    public Films removeActors(Actors actors) {
        this.actors.remove(actors);
        return this;
    }

    public void setActors(Set<Actors> actors) {
        this.actors = actors;
    }

    public Set<ProductionCompany> getProductionCompanies() {
        return productionCompanies;
    }

    public Films productionCompanies(Set<ProductionCompany> productionCompanies) {
        this.productionCompanies = productionCompanies;
        return this;
    }

    public Films addProductionCompany(ProductionCompany productionCompany) {
        this.productionCompanies.add(productionCompany);
        return this;
    }

    public Films removeProductionCompany(ProductionCompany productionCompany) {
        this.productionCompanies.remove(productionCompany);
        return this;
    }

    public void setProductionCompanies(Set<ProductionCompany> productionCompanies) {
        this.productionCompanies = productionCompanies;
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
        Films films = (Films) o;
        if (films.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), films.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Films{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", poster='" + getPoster() + "'" +
            ", posterContentType='" + getPosterContentType() + "'" +
            ", adult='" + isAdult() + "'" +
            ", budget='" + getBudget() + "'" +
            ", popularity=" + getPopularity() +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", revenue=" + getRevenue() +
            ", runtime=" + getRuntime() +
            ", status='" + getStatus() + "'" +
            ", rating=" + getRating() +
            "}";
    }
}
