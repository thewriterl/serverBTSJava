package films.repository;

import films.domain.SpokenLanguages;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SpokenLanguages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpokenLanguagesRepository extends JpaRepository<SpokenLanguages, Long> {

}
