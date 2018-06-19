package films.web.rest;

import films.MyApp;

import films.domain.ProductionCountries;
import films.repository.ProductionCountriesRepository;
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
 * Test class for the ProductionCountriesResource REST controller.
 *
 * @see ProductionCountriesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class ProductionCountriesResourceIntTest {

    private static final String DEFAULT_COUNTRY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ProductionCountriesRepository productionCountriesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductionCountriesMockMvc;

    private ProductionCountries productionCountries;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductionCountriesResource productionCountriesResource = new ProductionCountriesResource(productionCountriesRepository);
        this.restProductionCountriesMockMvc = MockMvcBuilders.standaloneSetup(productionCountriesResource)
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
    public static ProductionCountries createEntity(EntityManager em) {
        ProductionCountries productionCountries = new ProductionCountries()
            .countryCode(DEFAULT_COUNTRY_CODE)
            .name(DEFAULT_NAME);
        return productionCountries;
    }

    @Before
    public void initTest() {
        productionCountries = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductionCountries() throws Exception {
        int databaseSizeBeforeCreate = productionCountriesRepository.findAll().size();

        // Create the ProductionCountries
        restProductionCountriesMockMvc.perform(post("/api/production-countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionCountries)))
            .andExpect(status().isCreated());

        // Validate the ProductionCountries in the database
        List<ProductionCountries> productionCountriesList = productionCountriesRepository.findAll();
        assertThat(productionCountriesList).hasSize(databaseSizeBeforeCreate + 1);
        ProductionCountries testProductionCountries = productionCountriesList.get(productionCountriesList.size() - 1);
        assertThat(testProductionCountries.getCountryCode()).isEqualTo(DEFAULT_COUNTRY_CODE);
        assertThat(testProductionCountries.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createProductionCountriesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productionCountriesRepository.findAll().size();

        // Create the ProductionCountries with an existing ID
        productionCountries.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductionCountriesMockMvc.perform(post("/api/production-countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionCountries)))
            .andExpect(status().isBadRequest());

        // Validate the ProductionCountries in the database
        List<ProductionCountries> productionCountriesList = productionCountriesRepository.findAll();
        assertThat(productionCountriesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProductionCountries() throws Exception {
        // Initialize the database
        productionCountriesRepository.saveAndFlush(productionCountries);

        // Get all the productionCountriesList
        restProductionCountriesMockMvc.perform(get("/api/production-countries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productionCountries.getId().intValue())))
            .andExpect(jsonPath("$.[*].countryCode").value(hasItem(DEFAULT_COUNTRY_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getProductionCountries() throws Exception {
        // Initialize the database
        productionCountriesRepository.saveAndFlush(productionCountries);

        // Get the productionCountries
        restProductionCountriesMockMvc.perform(get("/api/production-countries/{id}", productionCountries.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productionCountries.getId().intValue()))
            .andExpect(jsonPath("$.countryCode").value(DEFAULT_COUNTRY_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProductionCountries() throws Exception {
        // Get the productionCountries
        restProductionCountriesMockMvc.perform(get("/api/production-countries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductionCountries() throws Exception {
        // Initialize the database
        productionCountriesRepository.saveAndFlush(productionCountries);
        int databaseSizeBeforeUpdate = productionCountriesRepository.findAll().size();

        // Update the productionCountries
        ProductionCountries updatedProductionCountries = productionCountriesRepository.findOne(productionCountries.getId());
        // Disconnect from session so that the updates on updatedProductionCountries are not directly saved in db
        em.detach(updatedProductionCountries);
        updatedProductionCountries
            .countryCode(UPDATED_COUNTRY_CODE)
            .name(UPDATED_NAME);

        restProductionCountriesMockMvc.perform(put("/api/production-countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductionCountries)))
            .andExpect(status().isOk());

        // Validate the ProductionCountries in the database
        List<ProductionCountries> productionCountriesList = productionCountriesRepository.findAll();
        assertThat(productionCountriesList).hasSize(databaseSizeBeforeUpdate);
        ProductionCountries testProductionCountries = productionCountriesList.get(productionCountriesList.size() - 1);
        assertThat(testProductionCountries.getCountryCode()).isEqualTo(UPDATED_COUNTRY_CODE);
        assertThat(testProductionCountries.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProductionCountries() throws Exception {
        int databaseSizeBeforeUpdate = productionCountriesRepository.findAll().size();

        // Create the ProductionCountries

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProductionCountriesMockMvc.perform(put("/api/production-countries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionCountries)))
            .andExpect(status().isCreated());

        // Validate the ProductionCountries in the database
        List<ProductionCountries> productionCountriesList = productionCountriesRepository.findAll();
        assertThat(productionCountriesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProductionCountries() throws Exception {
        // Initialize the database
        productionCountriesRepository.saveAndFlush(productionCountries);
        int databaseSizeBeforeDelete = productionCountriesRepository.findAll().size();

        // Get the productionCountries
        restProductionCountriesMockMvc.perform(delete("/api/production-countries/{id}", productionCountries.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductionCountries> productionCountriesList = productionCountriesRepository.findAll();
        assertThat(productionCountriesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductionCountries.class);
        ProductionCountries productionCountries1 = new ProductionCountries();
        productionCountries1.setId(1L);
        ProductionCountries productionCountries2 = new ProductionCountries();
        productionCountries2.setId(productionCountries1.getId());
        assertThat(productionCountries1).isEqualTo(productionCountries2);
        productionCountries2.setId(2L);
        assertThat(productionCountries1).isNotEqualTo(productionCountries2);
        productionCountries1.setId(null);
        assertThat(productionCountries1).isNotEqualTo(productionCountries2);
    }
}
