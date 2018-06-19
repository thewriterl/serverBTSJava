package films.web.rest;

import com.codahale.metrics.annotation.Timed;
import films.domain.SpokenLanguages;

import films.repository.SpokenLanguagesRepository;
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
 * REST controller for managing SpokenLanguages.
 */
@RestController
@RequestMapping("/api")
public class SpokenLanguagesResource {

    private final Logger log = LoggerFactory.getLogger(SpokenLanguagesResource.class);

    private static final String ENTITY_NAME = "spokenLanguages";

    private final SpokenLanguagesRepository spokenLanguagesRepository;

    public SpokenLanguagesResource(SpokenLanguagesRepository spokenLanguagesRepository) {
        this.spokenLanguagesRepository = spokenLanguagesRepository;
    }

    /**
     * POST  /spoken-languages : Create a new spokenLanguages.
     *
     * @param spokenLanguages the spokenLanguages to create
     * @return the ResponseEntity with status 201 (Created) and with body the new spokenLanguages, or with status 400 (Bad Request) if the spokenLanguages has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/spoken-languages")
    @Timed
    public ResponseEntity<SpokenLanguages> createSpokenLanguages(@RequestBody SpokenLanguages spokenLanguages) throws URISyntaxException {
        log.debug("REST request to save SpokenLanguages : {}", spokenLanguages);
        if (spokenLanguages.getId() != null) {
            throw new BadRequestAlertException("A new spokenLanguages cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SpokenLanguages result = spokenLanguagesRepository.save(spokenLanguages);
        return ResponseEntity.created(new URI("/api/spoken-languages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /spoken-languages : Updates an existing spokenLanguages.
     *
     * @param spokenLanguages the spokenLanguages to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated spokenLanguages,
     * or with status 400 (Bad Request) if the spokenLanguages is not valid,
     * or with status 500 (Internal Server Error) if the spokenLanguages couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/spoken-languages")
    @Timed
    public ResponseEntity<SpokenLanguages> updateSpokenLanguages(@RequestBody SpokenLanguages spokenLanguages) throws URISyntaxException {
        log.debug("REST request to update SpokenLanguages : {}", spokenLanguages);
        if (spokenLanguages.getId() == null) {
            return createSpokenLanguages(spokenLanguages);
        }
        SpokenLanguages result = spokenLanguagesRepository.save(spokenLanguages);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, spokenLanguages.getId().toString()))
            .body(result);
    }

    /**
     * GET  /spoken-languages : get all the spokenLanguages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of spokenLanguages in body
     */
    @GetMapping("/spoken-languages")
    @Timed
    public List<SpokenLanguages> getAllSpokenLanguages() {
        log.debug("REST request to get all SpokenLanguages");
        return spokenLanguagesRepository.findAll();
        }

    /**
     * GET  /spoken-languages/:id : get the "id" spokenLanguages.
     *
     * @param id the id of the spokenLanguages to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the spokenLanguages, or with status 404 (Not Found)
     */
    @GetMapping("/spoken-languages/{id}")
    @Timed
    public ResponseEntity<SpokenLanguages> getSpokenLanguages(@PathVariable Long id) {
        log.debug("REST request to get SpokenLanguages : {}", id);
        SpokenLanguages spokenLanguages = spokenLanguagesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(spokenLanguages));
    }

    /**
     * DELETE  /spoken-languages/:id : delete the "id" spokenLanguages.
     *
     * @param id the id of the spokenLanguages to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/spoken-languages/{id}")
    @Timed
    public ResponseEntity<Void> deleteSpokenLanguages(@PathVariable Long id) {
        log.debug("REST request to delete SpokenLanguages : {}", id);
        spokenLanguagesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
