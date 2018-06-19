package films.web.rest;

import com.codahale.metrics.annotation.Timed;
import films.domain.Director;

import films.repository.DirectorRepository;
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
 * REST controller for managing Director.
 */
@RestController
@RequestMapping("/api")
public class DirectorResource {

    private final Logger log = LoggerFactory.getLogger(DirectorResource.class);

    private static final String ENTITY_NAME = "director";

    private final DirectorRepository directorRepository;

    public DirectorResource(DirectorRepository directorRepository) {
        this.directorRepository = directorRepository;
    }

    /**
     * POST  /directors : Create a new director.
     *
     * @param director the director to create
     * @return the ResponseEntity with status 201 (Created) and with body the new director, or with status 400 (Bad Request) if the director has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/directors")
    @Timed
    public ResponseEntity<Director> createDirector(@RequestBody Director director) throws URISyntaxException {
        log.debug("REST request to save Director : {}", director);
        if (director.getId() != null) {
            throw new BadRequestAlertException("A new director cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Director result = directorRepository.save(director);
        return ResponseEntity.created(new URI("/api/directors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /directors : Updates an existing director.
     *
     * @param director the director to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated director,
     * or with status 400 (Bad Request) if the director is not valid,
     * or with status 500 (Internal Server Error) if the director couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/directors")
    @Timed
    public ResponseEntity<Director> updateDirector(@RequestBody Director director) throws URISyntaxException {
        log.debug("REST request to update Director : {}", director);
        if (director.getId() == null) {
            return createDirector(director);
        }
        Director result = directorRepository.save(director);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, director.getId().toString()))
            .body(result);
    }

    /**
     * GET  /directors : get all the directors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of directors in body
     */
    @GetMapping("/directors")
    @Timed
    public List<Director> getAllDirectors() {
        log.debug("REST request to get all Directors");
        return directorRepository.findAll();
        }

    /**
     * GET  /directors/:id : get the "id" director.
     *
     * @param id the id of the director to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the director, or with status 404 (Not Found)
     */
    @GetMapping("/directors/{id}")
    @Timed
    public ResponseEntity<Director> getDirector(@PathVariable Long id) {
        log.debug("REST request to get Director : {}", id);
        Director director = directorRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(director));
    }

    /**
     * DELETE  /directors/:id : delete the "id" director.
     *
     * @param id the id of the director to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/directors/{id}")
    @Timed
    public ResponseEntity<Void> deleteDirector(@PathVariable Long id) {
        log.debug("REST request to delete Director : {}", id);
        directorRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
