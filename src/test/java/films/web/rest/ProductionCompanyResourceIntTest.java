package films.web.rest;

import films.MyApp;

import films.domain.ProductionCompany;
import films.repository.ProductionCompanyRepository;
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
import java.util.List;

import static films.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProductionCompanyResource REST controller.
 *
 * @see ProductionCompanyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class ProductionCompanyResourceIntTest {

    private static final String DEFAULT_LOGO_PATH = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_PATH = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGO_URL = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO_URL = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_LOGO_URL_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_URL_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    @Autowired
    private ProductionCompanyRepository productionCompanyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductionCompanyMockMvc;

    private ProductionCompany productionCompany;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductionCompanyResource productionCompanyResource = new ProductionCompanyResource(productionCompanyRepository);
        this.restProductionCompanyMockMvc = MockMvcBuilders.standaloneSetup(productionCompanyResource)
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
    public static ProductionCompany createEntity(EntityManager em) {
        ProductionCompany productionCompany = new ProductionCompany()
            .logoPath(DEFAULT_LOGO_PATH)
            .logoURL(DEFAULT_LOGO_URL)
            .logoURLContentType(DEFAULT_LOGO_URL_CONTENT_TYPE)
            .name(DEFAULT_NAME)
            .country(DEFAULT_COUNTRY);
        return productionCompany;
    }

    @Before
    public void initTest() {
        productionCompany = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductionCompany() throws Exception {
        int databaseSizeBeforeCreate = productionCompanyRepository.findAll().size();

        // Create the ProductionCompany
        restProductionCompanyMockMvc.perform(post("/api/production-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionCompany)))
            .andExpect(status().isCreated());

        // Validate the ProductionCompany in the database
        List<ProductionCompany> productionCompanyList = productionCompanyRepository.findAll();
        assertThat(productionCompanyList).hasSize(databaseSizeBeforeCreate + 1);
        ProductionCompany testProductionCompany = productionCompanyList.get(productionCompanyList.size() - 1);
        assertThat(testProductionCompany.getLogoPath()).isEqualTo(DEFAULT_LOGO_PATH);
        assertThat(testProductionCompany.getLogoURL()).isEqualTo(DEFAULT_LOGO_URL);
        assertThat(testProductionCompany.getLogoURLContentType()).isEqualTo(DEFAULT_LOGO_URL_CONTENT_TYPE);
        assertThat(testProductionCompany.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProductionCompany.getCountry()).isEqualTo(DEFAULT_COUNTRY);
    }

    @Test
    @Transactional
    public void createProductionCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productionCompanyRepository.findAll().size();

        // Create the ProductionCompany with an existing ID
        productionCompany.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductionCompanyMockMvc.perform(post("/api/production-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionCompany)))
            .andExpect(status().isBadRequest());

        // Validate the ProductionCompany in the database
        List<ProductionCompany> productionCompanyList = productionCompanyRepository.findAll();
        assertThat(productionCompanyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProductionCompanies() throws Exception {
        // Initialize the database
        productionCompanyRepository.saveAndFlush(productionCompany);

        // Get all the productionCompanyList
        restProductionCompanyMockMvc.perform(get("/api/production-companies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productionCompany.getId().intValue())))
            .andExpect(jsonPath("$.[*].logoPath").value(hasItem(DEFAULT_LOGO_PATH.toString())))
            .andExpect(jsonPath("$.[*].logoURLContentType").value(hasItem(DEFAULT_LOGO_URL_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logoURL").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO_URL))))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())));
    }

    @Test
    @Transactional
    public void getProductionCompany() throws Exception {
        // Initialize the database
        productionCompanyRepository.saveAndFlush(productionCompany);

        // Get the productionCompany
        restProductionCompanyMockMvc.perform(get("/api/production-companies/{id}", productionCompany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productionCompany.getId().intValue()))
            .andExpect(jsonPath("$.logoPath").value(DEFAULT_LOGO_PATH.toString()))
            .andExpect(jsonPath("$.logoURLContentType").value(DEFAULT_LOGO_URL_CONTENT_TYPE))
            .andExpect(jsonPath("$.logoURL").value(Base64Utils.encodeToString(DEFAULT_LOGO_URL)))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProductionCompany() throws Exception {
        // Get the productionCompany
        restProductionCompanyMockMvc.perform(get("/api/production-companies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductionCompany() throws Exception {
        // Initialize the database
        productionCompanyRepository.saveAndFlush(productionCompany);
        int databaseSizeBeforeUpdate = productionCompanyRepository.findAll().size();

        // Update the productionCompany
        ProductionCompany updatedProductionCompany = productionCompanyRepository.findOne(productionCompany.getId());
        // Disconnect from session so that the updates on updatedProductionCompany are not directly saved in db
        em.detach(updatedProductionCompany);
        updatedProductionCompany
            .logoPath(UPDATED_LOGO_PATH)
            .logoURL(UPDATED_LOGO_URL)
            .logoURLContentType(UPDATED_LOGO_URL_CONTENT_TYPE)
            .name(UPDATED_NAME)
            .country(UPDATED_COUNTRY);

        restProductionCompanyMockMvc.perform(put("/api/production-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductionCompany)))
            .andExpect(status().isOk());

        // Validate the ProductionCompany in the database
        List<ProductionCompany> productionCompanyList = productionCompanyRepository.findAll();
        assertThat(productionCompanyList).hasSize(databaseSizeBeforeUpdate);
        ProductionCompany testProductionCompany = productionCompanyList.get(productionCompanyList.size() - 1);
        assertThat(testProductionCompany.getLogoPath()).isEqualTo(UPDATED_LOGO_PATH);
        assertThat(testProductionCompany.getLogoURL()).isEqualTo(UPDATED_LOGO_URL);
        assertThat(testProductionCompany.getLogoURLContentType()).isEqualTo(UPDATED_LOGO_URL_CONTENT_TYPE);
        assertThat(testProductionCompany.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProductionCompany.getCountry()).isEqualTo(UPDATED_COUNTRY);
    }

    @Test
    @Transactional
    public void updateNonExistingProductionCompany() throws Exception {
        int databaseSizeBeforeUpdate = productionCompanyRepository.findAll().size();

        // Create the ProductionCompany

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProductionCompanyMockMvc.perform(put("/api/production-companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionCompany)))
            .andExpect(status().isCreated());

        // Validate the ProductionCompany in the database
        List<ProductionCompany> productionCompanyList = productionCompanyRepository.findAll();
        assertThat(productionCompanyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProductionCompany() throws Exception {
        // Initialize the database
        productionCompanyRepository.saveAndFlush(productionCompany);
        int databaseSizeBeforeDelete = productionCompanyRepository.findAll().size();

        // Get the productionCompany
        restProductionCompanyMockMvc.perform(delete("/api/production-companies/{id}", productionCompany.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductionCompany> productionCompanyList = productionCompanyRepository.findAll();
        assertThat(productionCompanyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductionCompany.class);
        ProductionCompany productionCompany1 = new ProductionCompany();
        productionCompany1.setId(1L);
        ProductionCompany productionCompany2 = new ProductionCompany();
        productionCompany2.setId(productionCompany1.getId());
        assertThat(productionCompany1).isEqualTo(productionCompany2);
        productionCompany2.setId(2L);
        assertThat(productionCompany1).isNotEqualTo(productionCompany2);
        productionCompany1.setId(null);
        assertThat(productionCompany1).isNotEqualTo(productionCompany2);
    }
}
