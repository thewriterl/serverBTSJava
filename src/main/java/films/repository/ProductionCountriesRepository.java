package films.repository;

import films.domain.ProductionCountries;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProductionCountries entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductionCountriesRepository extends JpaRepository<ProductionCountries, Long> {

}
