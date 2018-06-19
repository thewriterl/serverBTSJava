package films.web.rest;

import com.codahale.metrics.annotation.Timed;
import films.domain.Genres;

import films.repository.GenresRepository;
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
 * REST controller for managing Genres.
 */
@RestController
@RequestMapping("/api")
public class GenresResource {

    private final Logger log = LoggerFactory.getLogger(GenresResource.class);

    private static final String ENTITY_NAME = "genres";

    private final GenresRepository genresRepository;

    public GenresResource(GenresRepository genresRepository) {
        this.genresRepository = genresRepository;
    }

    /**
     * POST  /genres : Create a new genres.
     *
     * @param genres the genres to create
     * @return the ResponseEntity with status 201 (Created) and with body the new genres, or with status 400 (Bad Request) if the genres has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/genres")
    @Timed
    public ResponseEntity<Genres> createGenres(@RequestBody Genres genres) throws URISyntaxException {
        log.debug("REST request to save Genres : {}", genres);
        if (genres.getId() != null) {
            throw new BadRequestAlertException("A new genres cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Genres result = genresRepository.save(genres);
        return ResponseEntity.created(new URI("/api/genres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /genres : Updates an existing genres.
     *
     * @param genres the genres to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated genres,
     * or with status 400 (Bad Request) if the genres is not valid,
     * or with status 500 (Internal Server Error) if the genres couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/genres")
    @Timed
    public ResponseEntity<Genres> updateGenres(@RequestBody Genres genres) throws URISyntaxException {
        log.debug("REST request to update Genres : {}", genres);
        if (genres.getId() == null) {
            return createGenres(genres);
        }
        Genres result = genresRepository.save(genres);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, genres.getId().toString()))
            .body(result);
    }

    /**
     * GET  /genres : get all the genres.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of genres in body
     */
    @GetMapping("/genres")
    @Timed
    public List<Genres> getAllGenres() {
        log.debug("REST request to get all Genres");
        return genresRepository.findAll();
        }

    /**
     * GET  /genres/:id : get the "id" genres.
     *
     * @param id the id of the genres to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the genres, or with status 404 (Not Found)
     */
    @GetMapping("/genres/{id}")
    @Timed
    public ResponseEntity<Genres> getGenres(@PathVariable Long id) {
        log.debug("REST request to get Genres : {}", id);
        Genres genres = genresRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(genres));
    }

    /**
     * DELETE  /genres/:id : delete the "id" genres.
     *
     * @param id the id of the genres to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/genres/{id}")
    @Timed
    public ResponseEntity<Void> deleteGenres(@PathVariable Long id) {
        log.debug("REST request to delete Genres : {}", id);
        genresRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
