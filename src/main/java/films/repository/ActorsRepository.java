package films.repository;

import films.domain.Actors;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Actors entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActorsRepository extends JpaRepository<Actors, Long> {

}
