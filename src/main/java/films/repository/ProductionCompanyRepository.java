package films.repository;

import films.domain.ProductionCompany;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProductionCompany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductionCompanyRepository extends JpaRepository<ProductionCompany, Long> {

}
