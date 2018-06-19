package films.web.rest;

import films.MyApp;

import films.domain.Actors;
import films.repository.ActorsRepository;
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
 * Test class for the ActorsResource REST controller.
 *
 * @see ActorsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class ActorsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ActorsRepository actorsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restActorsMockMvc;

    private Actors actors;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ActorsResource actorsResource = new ActorsResource(actorsRepository);
        this.restActorsMockMvc = MockMvcBuilders.standaloneSetup(actorsResource)
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
    public static Actors createEntity(EntityManager em) {
        Actors actors = new Actors()
            .name(DEFAULT_NAME);
        return actors;
    }

    @Before
    public void initTest() {
        actors = createEntity(em);
    }

    @Test
    @Transactional
    public void createActors() throws Exception {
        int databaseSizeBeforeCreate = actorsRepository.findAll().size();

        // Create the Actors
        restActorsMockMvc.perform(post("/api/actors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actors)))
            .andExpect(status().isCreated());

        // Validate the Actors in the database
        List<Actors> actorsList = actorsRepository.findAll();
        assertThat(actorsList).hasSize(databaseSizeBeforeCreate + 1);
        Actors testActors = actorsList.get(actorsList.size() - 1);
        assertThat(testActors.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createActorsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = actorsRepository.findAll().size();

        // Create the Actors with an existing ID
        actors.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActorsMockMvc.perform(post("/api/actors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actors)))
            .andExpect(status().isBadRequest());

        // Validate the Actors in the database
        List<Actors> actorsList = actorsRepository.findAll();
        assertThat(actorsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllActors() throws Exception {
        // Initialize the database
        actorsRepository.saveAndFlush(actors);

        // Get all the actorsList
        restActorsMockMvc.perform(get("/api/actors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(actors.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getActors() throws Exception {
        // Initialize the database
        actorsRepository.saveAndFlush(actors);

        // Get the actors
        restActorsMockMvc.perform(get("/api/actors/{id}", actors.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(actors.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingActors() throws Exception {
        // Get the actors
        restActorsMockMvc.perform(get("/api/actors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateActors() throws Exception {
        // Initialize the database
        actorsRepository.saveAndFlush(actors);
        int databaseSizeBeforeUpdate = actorsRepository.findAll().size();

        // Update the actors
        Actors updatedActors = actorsRepository.findOne(actors.getId());
        // Disconnect from session so that the updates on updatedActors are not directly saved in db
        em.detach(updatedActors);
        updatedActors
            .name(UPDATED_NAME);

        restActorsMockMvc.perform(put("/api/actors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedActors)))
            .andExpect(status().isOk());

        // Validate the Actors in the database
        List<Actors> actorsList = actorsRepository.findAll();
        assertThat(actorsList).hasSize(databaseSizeBeforeUpdate);
        Actors testActors = actorsList.get(actorsList.size() - 1);
        assertThat(testActors.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingActors() throws Exception {
        int databaseSizeBeforeUpdate = actorsRepository.findAll().size();

        // Create the Actors

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restActorsMockMvc.perform(put("/api/actors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actors)))
            .andExpect(status().isCreated());

        // Validate the Actors in the database
        List<Actors> actorsList = actorsRepository.findAll();
        assertThat(actorsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteActors() throws Exception {
        // Initialize the database
        actorsRepository.saveAndFlush(actors);
        int databaseSizeBeforeDelete = actorsRepository.findAll().size();

        // Get the actors
        restActorsMockMvc.perform(delete("/api/actors/{id}", actors.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Actors> actorsList = actorsRepository.findAll();
        assertThat(actorsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Actors.class);
        Actors actors1 = new Actors();
        actors1.setId(1L);
        Actors actors2 = new Actors();
        actors2.setId(actors1.getId());
        assertThat(actors1).isEqualTo(actors2);
        actors2.setId(2L);
        assertThat(actors1).isNotEqualTo(actors2);
        actors1.setId(null);
        assertThat(actors1).isNotEqualTo(actors2);
    }
}
