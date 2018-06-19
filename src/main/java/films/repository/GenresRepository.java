package films.repository;

import films.domain.Genres;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Genres entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GenresRepository extends JpaRepository<Genres, Long> {

}
