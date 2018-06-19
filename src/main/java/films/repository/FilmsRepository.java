package films.repository;

import films.domain.Films;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Films entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilmsRepository extends JpaRepository<Films, Long> {
    @Query("select distinct films from Films films left join fetch films.directors left join fetch films.genres left join fetch films.productionCountries left join fetch films.spokenLanguages left join fetch films.posts left join fetch films.actors left join fetch films.productionCompanies")
    List<Films> findAllWithEagerRelationships();

    @Query("select films from Films films left join fetch films.directors left join fetch films.genres left join fetch films.productionCountries left join fetch films.spokenLanguages left join fetch films.posts left join fetch films.actors left join fetch films.productionCompanies where films.id =:id")
    Films findOneWithEagerRelationships(@Param("id") Long id);

}
