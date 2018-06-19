package films.web.rest;

import com.codahale.metrics.annotation.Timed;
import films.domain.ProductionCountries;

import films.repository.ProductionCountriesRepository;
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
 * REST controller for managing ProductionCountries.
 */
@RestController
@RequestMapping("/api")
public class ProductionCountriesResource {

    private final Logger log = LoggerFactory.getLogger(ProductionCountriesResource.class);

    private static final String ENTITY_NAME = "productionCountries";

    private final ProductionCountriesRepository productionCountriesRepository;

    public ProductionCountriesResource(ProductionCountriesRepository productionCountriesRepository) {
        this.productionCountriesRepository = productionCountriesRepository;
    }

    /**
     * POST  /production-countries : Create a new productionCountries.
     *
     * @param productionCountries the productionCountries to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productionCountries, or with status 400 (Bad Request) if the productionCountries has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/production-countries")
    @Timed
    public ResponseEntity<ProductionCountries> createProductionCountries(@RequestBody ProductionCountries productionCountries) throws URISyntaxException {
        log.debug("REST request to save ProductionCountries : {}", productionCountries);
        if (productionCountries.getId() != null) {
            throw new BadRequestAlertException("A new productionCountries cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductionCountries result = productionCountriesRepository.save(productionCountries);
        return ResponseEntity.created(new URI("/api/production-countries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /production-countries : Updates an existing productionCountries.
     *
     * @param productionCountries the productionCountries to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productionCountries,
     * or with status 400 (Bad Request) if the productionCountries is not valid,
     * or with status 500 (Internal Server Error) if the productionCountries couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/production-countries")
    @Timed
    public ResponseEntity<ProductionCountries> updateProductionCountries(@RequestBody ProductionCountries productionCountries) throws URISyntaxException {
        log.debug("REST request to update ProductionCountries : {}", productionCountries);
        if (productionCountries.getId() == null) {
            return createProductionCountries(productionCountries);
        }
        ProductionCountries result = productionCountriesRepository.save(productionCountries);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productionCountries.getId().toString()))
            .body(result);
    }

    /**
     * GET  /production-countries : get all the productionCountries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productionCountries in body
     */
    @GetMapping("/production-countries")
    @Timed
    public List<ProductionCountries> getAllProductionCountries() {
        log.debug("REST request to get all ProductionCountries");
        return productionCountriesRepository.findAll();
        }

    /**
     * GET  /production-countries/:id : get the "id" productionCountries.
     *
     * @param id the id of the productionCountries to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productionCountries, or with status 404 (Not Found)
     */
    @GetMapping("/production-countries/{id}")
    @Timed
    public ResponseEntity<ProductionCountries> getProductionCountries(@PathVariable Long id) {
        log.debug("REST request to get ProductionCountries : {}", id);
        ProductionCountries productionCountries = productionCountriesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productionCountries));
    }

    /**
     * DELETE  /production-countries/:id : delete the "id" productionCountries.
     *
     * @param id the id of the productionCountries to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/production-countries/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductionCountries(@PathVariable Long id) {
        log.debug("REST request to delete ProductionCountries : {}", id);
        productionCountriesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
