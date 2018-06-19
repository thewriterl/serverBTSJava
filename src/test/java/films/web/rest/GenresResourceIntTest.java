package films.web.rest;

import films.MyApp;

import films.domain.Genres;
import films.repository.GenresRepository;
import films.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static films.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GenresResource REST controller.
 *
 * @see GenresResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class GenresResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GenresRepository genresRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGenresMockMvc;

    private Genres genres;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GenresResource genresResource = new GenresResource(genresRepository);
        this.restGenresMockMvc = MockMvcBuilders.standaloneSetup(genresResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Genres createEntity(EntityManager em) {
        Genres genres = new Genres()
            .name(DEFAULT_NAME);
        return genres;
    }

    @Before
    public void initTest() {
        genres = createEntity(em);
    }

    @Test
    @Transactional
    public void createGenres() throws Exception {
        int databaseSizeBeforeCreate = genresRepository.findAll().size();

        // Create the Genres
        restGenresMockMvc.perform(post("/api/genres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genres)))
            .andExpect(status().isCreated());

        // Validate the Genres in the database
        List<Genres> genresList = genresRepository.findAll();
        assertThat(genresList).hasSize(databaseSizeBeforeCreate + 1);
        Genres testGenres = genresList.get(genresList.size() - 1);
        assertThat(testGenres.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGenresWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = genresRepository.findAll().size();

        // Create the Genres with an existing ID
        genres.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenresMockMvc.perform(post("/api/genres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genres)))
            .andExpect(status().isBadRequest());

        // Validate the Genres in the database
        List<Genres> genresList = genresRepository.findAll();
        assertThat(genresList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGenres() throws Exception {
        // Initialize the database
        genresRepository.saveAndFlush(genres);

        // Get all the genresList
        restGenresMockMvc.perform(get("/api/genres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genres.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getGenres() throws Exception {
        // Initialize the database
        genresRepository.saveAndFlush(genres);

        // Get the genres
        restGenresMockMvc.perform(get("/api/genres/{id}", genres.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(genres.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGenres() throws Exception {
        // Get the genres
        restGenresMockMvc.perform(get("/api/genres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGenres() throws Exception {
        // Initialize the database
        genresRepository.saveAndFlush(genres);
        int databaseSizeBeforeUpdate = genresRepository.findAll().size();

        // Update the genres
        Genres updatedGenres = genresRepository.findOne(genres.getId());
        // Disconnect from session so that the updates on updatedGenres are not directly saved in db
        em.detach(updatedGenres);
        updatedGenres
            .name(UPDATED_NAME);

        restGenresMockMvc.perform(put("/api/genres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGenres)))
            .andExpect(status().isOk());

        // Validate the Genres in the database
        List<Genres> genresList = genresRepository.findAll();
        assertThat(genresList).hasSize(databaseSizeBeforeUpdate);
        Genres testGenres = genresList.get(genresList.size() - 1);
        assertThat(testGenres.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGenres() throws Exception {
        int databaseSizeBeforeUpdate = genresRepository.findAll().size();

        // Create the Genres

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGenresMockMvc.perform(put("/api/genres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genres)))
            .andExpect(status().isCreated());

        // Validate the Genres in the database
        List<Genres> genresList = genresRepository.findAll();
        assertThat(genresList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGenres() throws Exception {
        // Initialize the database
        genresRepository.saveAndFlush(genres);
        int databaseSizeBeforeDelete = genresRepository.findAll().size();

        // Get the genres
        restGenresMockMvc.perform(delete("/api/genres/{id}", genres.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Genres> genresList = genresRepository.findAll();
        assertThat(genresList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Genres.class);
        Genres genres1 = new Genres();
        genres1.setId(1L);
        Genres genres2 = new Genres();
        genres2.setId(genres1.getId());
        assertThat(genres1).isEqualTo(genres2);
        genres2.setId(2L);
        assertThat(genres1).isNotEqualTo(genres2);
        genres1.setId(null);
        assertThat(genres1).isNotEqualTo(genres2);
    }
}
