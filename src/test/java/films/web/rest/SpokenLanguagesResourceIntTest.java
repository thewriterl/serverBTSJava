package films.web.rest;

import films.MyApp;

import films.domain.SpokenLanguages;
import films.repository.SpokenLanguagesRepository;
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
 * Test class for the SpokenLanguagesResource REST controller.
 *
 * @see SpokenLanguagesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class SpokenLanguagesResourceIntTest {

    private static final String DEFAULT_COUNTRY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SpokenLanguagesRepository spokenLanguagesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSpokenLanguagesMockMvc;

    private SpokenLanguages spokenLanguages;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpokenLanguagesResource spokenLanguagesResource = new SpokenLanguagesResource(spokenLanguagesRepository);
        this.restSpokenLanguagesMockMvc = MockMvcBuilders.standaloneSetup(spokenLanguagesResource)
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
    public static SpokenLanguages createEntity(EntityManager em) {
        SpokenLanguages spokenLanguages = new SpokenLanguages()
            .countryCode(DEFAULT_COUNTRY_CODE)
            .name(DEFAULT_NAME);
        return spokenLanguages;
    }

    @Before
    public void initTest() {
        spokenLanguages = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpokenLanguages() throws Exception {
        int databaseSizeBeforeCreate = spokenLanguagesRepository.findAll().size();

        // Create the SpokenLanguages
        restSpokenLanguagesMockMvc.perform(post("/api/spoken-languages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spokenLanguages)))
            .andExpect(status().isCreated());

        // Validate the SpokenLanguages in the database
        List<SpokenLanguages> spokenLanguagesList = spokenLanguagesRepository.findAll();
        assertThat(spokenLanguagesList).hasSize(databaseSizeBeforeCreate + 1);
        SpokenLanguages testSpokenLanguages = spokenLanguagesList.get(spokenLanguagesList.size() - 1);
        assertThat(testSpokenLanguages.getCountryCode()).isEqualTo(DEFAULT_COUNTRY_CODE);
        assertThat(testSpokenLanguages.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSpokenLanguagesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = spokenLanguagesRepository.findAll().size();

        // Create the SpokenLanguages with an existing ID
        spokenLanguages.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpokenLanguagesMockMvc.perform(post("/api/spoken-languages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spokenLanguages)))
            .andExpect(status().isBadRequest());

        // Validate the SpokenLanguages in the database
        List<SpokenLanguages> spokenLanguagesList = spokenLanguagesRepository.findAll();
        assertThat(spokenLanguagesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSpokenLanguages() throws Exception {
        // Initialize the database
        spokenLanguagesRepository.saveAndFlush(spokenLanguages);

        // Get all the spokenLanguagesList
        restSpokenLanguagesMockMvc.perform(get("/api/spoken-languages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spokenLanguages.getId().intValue())))
            .andExpect(jsonPath("$.[*].countryCode").value(hasItem(DEFAULT_COUNTRY_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSpokenLanguages() throws Exception {
        // Initialize the database
        spokenLanguagesRepository.saveAndFlush(spokenLanguages);

        // Get the spokenLanguages
        restSpokenLanguagesMockMvc.perform(get("/api/spoken-languages/{id}", spokenLanguages.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(spokenLanguages.getId().intValue()))
            .andExpect(jsonPath("$.countryCode").value(DEFAULT_COUNTRY_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSpokenLanguages() throws Exception {
        // Get the spokenLanguages
        restSpokenLanguagesMockMvc.perform(get("/api/spoken-languages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpokenLanguages() throws Exception {
        // Initialize the database
        spokenLanguagesRepository.saveAndFlush(spokenLanguages);
        int databaseSizeBeforeUpdate = spokenLanguagesRepository.findAll().size();

        // Update the spokenLanguages
        SpokenLanguages updatedSpokenLanguages = spokenLanguagesRepository.findOne(spokenLanguages.getId());
        // Disconnect from session so that the updates on updatedSpokenLanguages are not directly saved in db
        em.detach(updatedSpokenLanguages);
        updatedSpokenLanguages
            .countryCode(UPDATED_COUNTRY_CODE)
            .name(UPDATED_NAME);

        restSpokenLanguagesMockMvc.perform(put("/api/spoken-languages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSpokenLanguages)))
            .andExpect(status().isOk());

        // Validate the SpokenLanguages in the database
        List<SpokenLanguages> spokenLanguagesList = spokenLanguagesRepository.findAll();
        assertThat(spokenLanguagesList).hasSize(databaseSizeBeforeUpdate);
        SpokenLanguages testSpokenLanguages = spokenLanguagesList.get(spokenLanguagesList.size() - 1);
        assertThat(testSpokenLanguages.getCountryCode()).isEqualTo(UPDATED_COUNTRY_CODE);
        assertThat(testSpokenLanguages.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSpokenLanguages() throws Exception {
        int databaseSizeBeforeUpdate = spokenLanguagesRepository.findAll().size();

        // Create the SpokenLanguages

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSpokenLanguagesMockMvc.perform(put("/api/spoken-languages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spokenLanguages)))
            .andExpect(status().isCreated());

        // Validate the SpokenLanguages in the database
        List<SpokenLanguages> spokenLanguagesList = spokenLanguagesRepository.findAll();
        assertThat(spokenLanguagesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSpokenLanguages() throws Exception {
        // Initialize the database
        spokenLanguagesRepository.saveAndFlush(spokenLanguages);
        int databaseSizeBeforeDelete = spokenLanguagesRepository.findAll().size();

        // Get the spokenLanguages
        restSpokenLanguagesMockMvc.perform(delete("/api/spoken-languages/{id}", spokenLanguages.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SpokenLanguages> spokenLanguagesList = spokenLanguagesRepository.findAll();
        assertThat(spokenLanguagesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpokenLanguages.class);
        SpokenLanguages spokenLanguages1 = new SpokenLanguages();
        spokenLanguages1.setId(1L);
        SpokenLanguages spokenLanguages2 = new SpokenLanguages();
        spokenLanguages2.setId(spokenLanguages1.getId());
        assertThat(spokenLanguages1).isEqualTo(spokenLanguages2);
        spokenLanguages2.setId(2L);
        assertThat(spokenLanguages1).isNotEqualTo(spokenLanguages2);
        spokenLanguages1.setId(null);
        assertThat(spokenLanguages1).isNotEqualTo(spokenLanguages2);
    }
}
