package films.web.rest;

import films.MyApp;

import films.domain.Director;
import films.repository.DirectorRepository;
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
 * Test class for the DirectorResource REST controller.
 *
 * @see DirectorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class DirectorResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private DirectorRepository directorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDirectorMockMvc;

    private Director director;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DirectorResource directorResource = new DirectorResource(directorRepository);
        this.restDirectorMockMvc = MockMvcBuilders.standaloneSetup(directorResource)
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
    public static Director createEntity(EntityManager em) {
        Director director = new Director()
            .name(DEFAULT_NAME);
        return director;
    }

    @Before
    public void initTest() {
        director = createEntity(em);
    }

    @Test
    @Transactional
    public void createDirector() throws Exception {
        int databaseSizeBeforeCreate = directorRepository.findAll().size();

        // Create the Director
        restDirectorMockMvc.perform(post("/api/directors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(director)))
            .andExpect(status().isCreated());

        // Validate the Director in the database
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeCreate + 1);
        Director testDirector = directorList.get(directorList.size() - 1);
        assertThat(testDirector.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createDirectorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = directorRepository.findAll().size();

        // Create the Director with an existing ID
        director.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDirectorMockMvc.perform(post("/api/directors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(director)))
            .andExpect(status().isBadRequest());

        // Validate the Director in the database
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDirectors() throws Exception {
        // Initialize the database
        directorRepository.saveAndFlush(director);

        // Get all the directorList
        restDirectorMockMvc.perform(get("/api/directors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(director.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getDirector() throws Exception {
        // Initialize the database
        directorRepository.saveAndFlush(director);

        // Get the director
        restDirectorMockMvc.perform(get("/api/directors/{id}", director.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(director.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDirector() throws Exception {
        // Get the director
        restDirectorMockMvc.perform(get("/api/directors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDirector() throws Exception {
        // Initialize the database
        directorRepository.saveAndFlush(director);
        int databaseSizeBeforeUpdate = directorRepository.findAll().size();

        // Update the director
        Director updatedDirector = directorRepository.findOne(director.getId());
        // Disconnect from session so that the updates on updatedDirector are not directly saved in db
        em.detach(updatedDirector);
        updatedDirector
            .name(UPDATED_NAME);

        restDirectorMockMvc.perform(put("/api/directors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDirector)))
            .andExpect(status().isOk());

        // Validate the Director in the database
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeUpdate);
        Director testDirector = directorList.get(directorList.size() - 1);
        assertThat(testDirector.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDirector() throws Exception {
        int databaseSizeBeforeUpdate = directorRepository.findAll().size();

        // Create the Director

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDirectorMockMvc.perform(put("/api/directors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(director)))
            .andExpect(status().isCreated());

        // Validate the Director in the database
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDirector() throws Exception {
        // Initialize the database
        directorRepository.saveAndFlush(director);
        int databaseSizeBeforeDelete = directorRepository.findAll().size();

        // Get the director
        restDirectorMockMvc.perform(delete("/api/directors/{id}", director.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Director> directorList = directorRepository.findAll();
        assertThat(directorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Director.class);
        Director director1 = new Director();
        director1.setId(1L);
        Director director2 = new Director();
        director2.setId(director1.getId());
        assertThat(director1).isEqualTo(director2);
        director2.setId(2L);
        assertThat(director1).isNotEqualTo(director2);
        director1.setId(null);
        assertThat(director1).isNotEqualTo(director2);
    }
}
