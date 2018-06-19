package films.repository;

import films.domain.Director;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Director entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {

}
