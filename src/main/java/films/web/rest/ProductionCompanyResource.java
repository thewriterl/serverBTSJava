package films.web.rest;

import com.codahale.metrics.annotation.Timed;
import films.domain.ProductionCompany;

import films.repository.ProductionCompanyRepository;
import films.web.rest.errors.BadRequestAlertException;
import films.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProductionCompany.
 */
@RestController
@RequestMapping("/api")
public class ProductionCompanyResource {

    private final Logger log = LoggerFactory.getLogger(ProductionCompanyResource.class);

    private static final String ENTITY_NAME = "productionCompany";

    private final ProductionCompanyRepository productionCompanyRepository;

    public ProductionCompanyResource(ProductionCompanyRepository productionCompanyRepository) {
        this.productionCompanyRepository = productionCompanyRepository;
    }

    /**
     * POST  /production-companies : Create a new productionCompany.
     *
     * @param productionCompany the productionCompany to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productionCompany, or with status 400 (Bad Request) if the productionCompany has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/production-companies")
    @Timed
    public ResponseEntity<ProductionCompany> createProductionCompany(@RequestBody ProductionCompany productionCompany) throws URISyntaxException {
        log.debug("REST request to save ProductionCompany : {}", productionCompany);
        if (productionCompany.getId() != null) {
            throw new BadRequestAlertException("A new productionCompany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductionCompany result = productionCompanyRepository.save(productionCompany);
        return ResponseEntity.created(new URI("/api/production-companies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /production-companies : Updates an existing productionCompany.
     *
     * @param productionCompany the productionCompany to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productionCompany,
     * or with status 400 (Bad Request) if the productionCompany is not valid,
     * or with status 500 (Internal Server Error) if the productionCompany couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/production-companies")
    @Timed
    public ResponseEntity<ProductionCompany> updateProductionCompany(@RequestBody ProductionCompany productionCompany) throws URISyntaxException {
        log.debug("REST request to update ProductionCompany : {}", productionCompany);
        if (productionCompany.getId() == null) {
            return createProductionCompany(productionCompany);
        }
        ProductionCompany result = productionCompanyRepository.save(productionCompany);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productionCompany.getId().toString()))
            .body(result);
    }

    /**
     * GET  /production-companies : get all the productionCompanies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productionCompanies in body
     */
    @GetMapping("/production-companies")
    @Timed
    public List<ProductionCompany> getAllProductionCompanies() {
        log.debug("REST request to get all ProductionCompanies");
        return productionCompanyRepository.findAll();
        }

    /**
     * GET  /production-companies/:id : get the "id" productionCompany.
     *
     * @param id the id of the productionCompany to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productionCompany, or with status 404 (Not Found)
     */
    @GetMapping("/production-companies/{id}")
    @Timed
    public ResponseEntity<ProductionCompany> getProductionCompany(@PathVariable Long id) {
        log.debug("REST request to get ProductionCompany : {}", id);
        ProductionCompany productionCompany = productionCompanyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productionCompany));
    }

    /**
     * DELETE  /production-companies/:id : delete the "id" productionCompany.
     *
     * @param id the id of the productionCompany to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/production-companies/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductionCompany(@PathVariable Long id) {
        log.debug("REST request to delete ProductionCompany : {}", id);
        productionCompanyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
