package films.web.rest;

import films.MyApp;

import films.domain.Films;
import films.repository.FilmsRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static films.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FilmsResource REST controller.
 *
 * @see FilmsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class FilmsResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_POSTER = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_POSTER = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_POSTER_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_POSTER_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_ADULT = false;
    private static final Boolean UPDATED_ADULT = true;

    private static final String DEFAULT_BUDGET = "AAAAAAAAAA";
    private static final String UPDATED_BUDGET = "BBBBBBBBBB";

    private static final Long DEFAULT_POPULARITY = 1L;
    private static final Long UPDATED_POPULARITY = 2L;

    private static final Instant DEFAULT_RELEASE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RELEASE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_REVENUE = 1L;
    private static final Long UPDATED_REVENUE = 2L;

    private static final Integer DEFAULT_RUNTIME = 1;
    private static final Integer UPDATED_RUNTIME = 2;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Float DEFAULT_RATING = 1F;
    private static final Float UPDATED_RATING = 2F;

    @Autowired
    private FilmsRepository filmsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFilmsMockMvc;

    private Films films;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FilmsResource filmsResource = new FilmsResource(filmsRepository);
        this.restFilmsMockMvc = MockMvcBuilders.standaloneSetup(filmsResource)
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
    public static Films createEntity(EntityManager em) {
        Films films = new Films()
            .title(DEFAULT_TITLE)
            .poster(DEFAULT_POSTER)
            .posterContentType(DEFAULT_POSTER_CONTENT_TYPE)
            .adult(DEFAULT_ADULT)
            .budget(DEFAULT_BUDGET)
            .popularity(DEFAULT_POPULARITY)
            .releaseDate(DEFAULT_RELEASE_DATE)
            .revenue(DEFAULT_REVENUE)
            .runtime(DEFAULT_RUNTIME)
            .status(DEFAULT_STATUS)
            .rating(DEFAULT_RATING);
        return films;
    }

    @Before
    public void initTest() {
        films = createEntity(em);
    }

    @Test
    @Transactional
    public void createFilms() throws Exception {
        int databaseSizeBeforeCreate = filmsRepository.findAll().size();

        // Create the Films
        restFilmsMockMvc.perform(post("/api/films")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(films)))
            .andExpect(status().isCreated());

        // Validate the Films in the database
        List<Films> filmsList = filmsRepository.findAll();
        assertThat(filmsList).hasSize(databaseSizeBeforeCreate + 1);
        Films testFilms = filmsList.get(filmsList.size() - 1);
        assertThat(testFilms.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testFilms.getPoster()).isEqualTo(DEFAULT_POSTER);
        assertThat(testFilms.getPosterContentType()).isEqualTo(DEFAULT_POSTER_CONTENT_TYPE);
        assertThat(testFilms.isAdult()).isEqualTo(DEFAULT_ADULT);
        assertThat(testFilms.getBudget()).isEqualTo(DEFAULT_BUDGET);
        assertThat(testFilms.getPopularity()).isEqualTo(DEFAULT_POPULARITY);
        assertThat(testFilms.getReleaseDate()).isEqualTo(DEFAULT_RELEASE_DATE);
        assertThat(testFilms.getRevenue()).isEqualTo(DEFAULT_REVENUE);
        assertThat(testFilms.getRuntime()).isEqualTo(DEFAULT_RUNTIME);
        assertThat(testFilms.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testFilms.getRating()).isEqualTo(DEFAULT_RATING);
    }

    @Test
    @Transactional
    public void createFilmsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = filmsRepository.findAll().size();

        // Create the Films with an existing ID
        films.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFilmsMockMvc.perform(post("/api/films")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(films)))
            .andExpect(status().isBadRequest());

        // Validate the Films in the database
        List<Films> filmsList = filmsRepository.findAll();
        assertThat(filmsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = filmsRepository.findAll().size();
        // set the field null
        films.setTitle(null);

        // Create the Films, which fails.

        restFilmsMockMvc.perform(post("/api/films")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(films)))
            .andExpect(status().isBadRequest());

        List<Films> filmsList = filmsRepository.findAll();
        assertThat(filmsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPosterIsRequired() throws Exception {
        int databaseSizeBeforeTest = filmsRepository.findAll().size();
        // set the field null
        films.setPoster(null);

        // Create the Films, which fails.

        restFilmsMockMvc.perform(post("/api/films")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(films)))
            .andExpect(status().isBadRequest());

        List<Films> filmsList = filmsRepository.findAll();
        assertThat(filmsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFilms() throws Exception {
        // Initialize the database
        filmsRepository.saveAndFlush(films);

        // Get all the filmsList
        restFilmsMockMvc.perform(get("/api/films?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(films.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].posterContentType").value(hasItem(DEFAULT_POSTER_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].poster").value(hasItem(Base64Utils.encodeToString(DEFAULT_POSTER))))
            .andExpect(jsonPath("$.[*].adult").value(hasItem(DEFAULT_ADULT.booleanValue())))
            .andExpect(jsonPath("$.[*].budget").value(hasItem(DEFAULT_BUDGET.toString())))
            .andExpect(jsonPath("$.[*].popularity").value(hasItem(DEFAULT_POPULARITY.intValue())))
            .andExpect(jsonPath("$.[*].releaseDate").value(hasItem(DEFAULT_RELEASE_DATE.toString())))
            .andExpect(jsonPath("$.[*].revenue").value(hasItem(DEFAULT_REVENUE.intValue())))
            .andExpect(jsonPath("$.[*].runtime").value(hasItem(DEFAULT_RUNTIME)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING.doubleValue())));
    }

    @Test
    @Transactional
    public void getFilms() throws Exception {
        // Initialize the database
        filmsRepository.saveAndFlush(films);

        // Get the films
        restFilmsMockMvc.perform(get("/api/films/{id}", films.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(films.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.posterContentType").value(DEFAULT_POSTER_CONTENT_TYPE))
            .andExpect(jsonPath("$.poster").value(Base64Utils.encodeToString(DEFAULT_POSTER)))
            .andExpect(jsonPath("$.adult").value(DEFAULT_ADULT.booleanValue()))
            .andExpect(jsonPath("$.budget").value(DEFAULT_BUDGET.toString()))
            .andExpect(jsonPath("$.popularity").value(DEFAULT_POPULARITY.intValue()))
            .andExpect(jsonPath("$.releaseDate").value(DEFAULT_RELEASE_DATE.toString()))
            .andExpect(jsonPath("$.revenue").value(DEFAULT_REVENUE.intValue()))
            .andExpect(jsonPath("$.runtime").value(DEFAULT_RUNTIME))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFilms() throws Exception {
        // Get the films
        restFilmsMockMvc.perform(get("/api/films/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFilms() throws Exception {
        // Initialize the database
        filmsRepository.saveAndFlush(films);
        int databaseSizeBeforeUpdate = filmsRepository.findAll().size();

        // Update the films
        Films updatedFilms = filmsRepository.findOne(films.getId());
        // Disconnect from session so that the updates on updatedFilms are not directly saved in db
        em.detach(updatedFilms);
        updatedFilms
            .title(UPDATED_TITLE)
            .poster(UPDATED_POSTER)
            .posterContentType(UPDATED_POSTER_CONTENT_TYPE)
            .adult(UPDATED_ADULT)
            .budget(UPDATED_BUDGET)
            .popularity(UPDATED_POPULARITY)
            .releaseDate(UPDATED_RELEASE_DATE)
            .revenue(UPDATED_REVENUE)
            .runtime(UPDATED_RUNTIME)
            .status(UPDATED_STATUS)
            .rating(UPDATED_RATING);

        restFilmsMockMvc.perform(put("/api/films")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFilms)))
            .andExpect(status().isOk());

        // Validate the Films in the database
        List<Films> filmsList = filmsRepository.findAll();
        assertThat(filmsList).hasSize(databaseSizeBeforeUpdate);
        Films testFilms = filmsList.get(filmsList.size() - 1);
        assertThat(testFilms.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testFilms.getPoster()).isEqualTo(UPDATED_POSTER);
        assertThat(testFilms.getPosterContentType()).isEqualTo(UPDATED_POSTER_CONTENT_TYPE);
        assertThat(testFilms.isAdult()).isEqualTo(UPDATED_ADULT);
        assertThat(testFilms.getBudget()).isEqualTo(UPDATED_BUDGET);
        assertThat(testFilms.getPopularity()).isEqualTo(UPDATED_POPULARITY);
        assertThat(testFilms.getReleaseDate()).isEqualTo(UPDATED_RELEASE_DATE);
        assertThat(testFilms.getRevenue()).isEqualTo(UPDATED_REVENUE);
        assertThat(testFilms.getRuntime()).isEqualTo(UPDATED_RUNTIME);
        assertThat(testFilms.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testFilms.getRating()).isEqualTo(UPDATED_RATING);
    }

    @Test
    @Transactional
    public void updateNonExistingFilms() throws Exception {
        int databaseSizeBeforeUpdate = filmsRepository.findAll().size();

        // Create the Films

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFilmsMockMvc.perform(put("/api/films")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(films)))
            .andExpect(status().isCreated());

        // Validate the Films in the database
        List<Films> filmsList = filmsRepository.findAll();
        assertThat(filmsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFilms() throws Exception {
        // Initialize the database
        filmsRepository.saveAndFlush(films);
        int databaseSizeBeforeDelete = filmsRepository.findAll().size();

        // Get the films
        restFilmsMockMvc.perform(delete("/api/films/{id}", films.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Films> filmsList = filmsRepository.findAll();
        assertThat(filmsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Films.class);
        Films films1 = new Films();
        films1.setId(1L);
        Films films2 = new Films();
        films2.setId(films1.getId());
        assertThat(films1).isEqualTo(films2);
        films2.setId(2L);
        assertThat(films1).isNotEqualTo(films2);
        films1.setId(null);
        assertThat(films1).isNotEqualTo(films2);
    }
}
