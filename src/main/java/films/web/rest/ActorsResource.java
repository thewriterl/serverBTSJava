package films.web.rest;

import com.codahale.metrics.annotation.Timed;
import films.domain.Actors;

import films.repository.ActorsRepository;
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
 * REST controller for managing Actors.
 */
@RestController
@RequestMapping("/api")
public class ActorsResource {

    private final Logger log = LoggerFactory.getLogger(ActorsResource.class);

    private static final String ENTITY_NAME = "actors";

    private final ActorsRepository actorsRepository;

    public ActorsResource(ActorsRepository actorsRepository) {
        this.actorsRepository = actorsRepository;
    }

    /**
     * POST  /actors : Create a new actors.
     *
     * @param actors the actors to create
     * @return the ResponseEntity with status 201 (Created) and with body the new actors, or with status 400 (Bad Request) if the actors has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/actors")
    @Timed
    public ResponseEntity<Actors> createActors(@RequestBody Actors actors) throws URISyntaxException {
        log.debug("REST request to save Actors : {}", actors);
        if (actors.getId() != null) {
            throw new BadRequestAlertException("A new actors cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Actors result = actorsRepository.save(actors);
        return ResponseEntity.created(new URI("/api/actors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /actors : Updates an existing actors.
     *
     * @param actors the actors to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated actors,
     * or with status 400 (Bad Request) if the actors is not valid,
     * or with status 500 (Internal Server Error) if the actors couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/actors")
    @Timed
    public ResponseEntity<Actors> updateActors(@RequestBody Actors actors) throws URISyntaxException {
        log.debug("REST request to update Actors : {}", actors);
        if (actors.getId() == null) {
            return createActors(actors);
        }
        Actors result = actorsRepository.save(actors);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, actors.getId().toString()))
            .body(result);
    }

    /**
     * GET  /actors : get all the actors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of actors in body
     */
    @GetMapping("/actors")
    @Timed
    public List<Actors> getAllActors() {
        log.debug("REST request to get all Actors");
        return actorsRepository.findAll();
        }

    /**
     * GET  /actors/:id : get the "id" actors.
     *
     * @param id the id of the actors to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the actors, or with status 404 (Not Found)
     */
    @GetMapping("/actors/{id}")
    @Timed
    public ResponseEntity<Actors> getActors(@PathVariable Long id) {
        log.debug("REST request to get Actors : {}", id);
        Actors actors = actorsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(actors));
    }

    /**
     * DELETE  /actors/:id : delete the "id" actors.
     *
     * @param id the id of the actors to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/actors/{id}")
    @Timed
    public ResponseEntity<Void> deleteActors(@PathVariable Long id) {
        log.debug("REST request to delete Actors : {}", id);
        actorsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
