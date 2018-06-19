package films.web.rest;

import com.codahale.metrics.annotation.Timed;
import films.domain.Films;

import films.repository.FilmsRepository;
import films.web.rest.errors.BadRequestAlertException;
import films.web.rest.util.HeaderUtil;
import films.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Films.
 */
@RestController
@RequestMapping("/api")
//@CrossOrigin(value="localhost:1997")
public class FilmsResource {

    private final Logger log = LoggerFactory.getLogger(FilmsResource.class);

    private static final String ENTITY_NAME = "films";

    private final FilmsRepository filmsRepository;

    public FilmsResource(FilmsRepository filmsRepository) {
        this.filmsRepository = filmsRepository;
    }

    /**
     * POST  /films : Create a new films.
     *
     * @param films the films to create
     * @return the ResponseEntity with status 201 (Created) and with body the new films, or with status 400 (Bad Request) if the films has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/films")
    @Timed
    public ResponseEntity<Films> createFilms(@Valid @RequestBody Films films) throws URISyntaxException {
        log.debug("REST request to save Films : {}", films);
        if (films.getId() != null) {
            throw new BadRequestAlertException("A new films cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Films result = filmsRepository.save(films);
        return ResponseEntity.created(new URI("/api/films/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /films : Updates an existing films.
     *
     * @param films the films to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated films,
     * or with status 400 (Bad Request) if the films is not valid,
     * or with status 500 (Internal Server Error) if the films couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/films")
    @Timed
    public ResponseEntity<Films> updateFilms(@Valid @RequestBody Films films) throws URISyntaxException {
        log.debug("REST request to update Films : {}", films);
        if (films.getId() == null) {
            return createFilms(films);
        }
        Films result = filmsRepository.save(films);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, films.getId().toString()))
            .body(result);
    }

    /**
     * GET  /films : get all the films.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of films in body
     */
    @GetMapping("/films")
    @Timed
    public ResponseEntity<List<Films>> getAllFilms(Pageable pageable) {
        log.debug("REST request to get a page of Films");
        Page<Films> page = filmsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/films");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /films/:id : get the "id" films.
     *
     * @param id the id of the films to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the films, or with status 404 (Not Found)
     */
    @GetMapping("/films/{id}")
    @Timed
    public ResponseEntity<Films> getFilms(@PathVariable Long id) {
        log.debug("REST request to get Films : {}", id);
        Films films = filmsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(films));
    }

    /**
     * DELETE  /films/:id : delete the "id" films.
     *
     * @param id the id of the films to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/films/{id}")
    @Timed
    public ResponseEntity<Void> deleteFilms(@PathVariable Long id) {
        log.debug("REST request to delete Films : {}", id);
        filmsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
