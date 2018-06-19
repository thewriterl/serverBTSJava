package films.web.rest;

import films.MyApp;

import films.domain.Posts;
import films.repository.PostsRepository;
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
 * Test class for the PostsResource REST controller.
 *
 * @see PostsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class PostsResourceIntTest {

    private static final String DEFAULT_POST_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_POST_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_POST_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_POST_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_VIDEO_URL = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_URL = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPostsMockMvc;

    private Posts posts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PostsResource postsResource = new PostsResource(postsRepository);
        this.restPostsMockMvc = MockMvcBuilders.standaloneSetup(postsResource)
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
    public static Posts createEntity(EntityManager em) {
        Posts posts = new Posts()
            .postTitle(DEFAULT_POST_TITLE)
            .postContent(DEFAULT_POST_CONTENT)
            .videoURL(DEFAULT_VIDEO_URL)
            .imageURL(DEFAULT_IMAGE_URL);
        return posts;
    }

    @Before
    public void initTest() {
        posts = createEntity(em);
    }

    @Test
    @Transactional
    public void createPosts() throws Exception {
        int databaseSizeBeforeCreate = postsRepository.findAll().size();

        // Create the Posts
        restPostsMockMvc.perform(post("/api/posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posts)))
            .andExpect(status().isCreated());

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll();
        assertThat(postsList).hasSize(databaseSizeBeforeCreate + 1);
        Posts testPosts = postsList.get(postsList.size() - 1);
        assertThat(testPosts.getPostTitle()).isEqualTo(DEFAULT_POST_TITLE);
        assertThat(testPosts.getPostContent()).isEqualTo(DEFAULT_POST_CONTENT);
        assertThat(testPosts.getVideoURL()).isEqualTo(DEFAULT_VIDEO_URL);
        assertThat(testPosts.getImageURL()).isEqualTo(DEFAULT_IMAGE_URL);
    }

    @Test
    @Transactional
    public void createPostsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = postsRepository.findAll().size();

        // Create the Posts with an existing ID
        posts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPostsMockMvc.perform(post("/api/posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posts)))
            .andExpect(status().isBadRequest());

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll();
        assertThat(postsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPostTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = postsRepository.findAll().size();
        // set the field null
        posts.setPostTitle(null);

        // Create the Posts, which fails.

        restPostsMockMvc.perform(post("/api/posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posts)))
            .andExpect(status().isBadRequest());

        List<Posts> postsList = postsRepository.findAll();
        assertThat(postsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPosts() throws Exception {
        // Initialize the database
        postsRepository.saveAndFlush(posts);

        // Get all the postsList
        restPostsMockMvc.perform(get("/api/posts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(posts.getId().intValue())))
            .andExpect(jsonPath("$.[*].postTitle").value(hasItem(DEFAULT_POST_TITLE.toString())))
            .andExpect(jsonPath("$.[*].postContent").value(hasItem(DEFAULT_POST_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].videoURL").value(hasItem(DEFAULT_VIDEO_URL.toString())))
            .andExpect(jsonPath("$.[*].imageURL").value(hasItem(DEFAULT_IMAGE_URL.toString())));
    }

    @Test
    @Transactional
    public void getPosts() throws Exception {
        // Initialize the database
        postsRepository.saveAndFlush(posts);

        // Get the posts
        restPostsMockMvc.perform(get("/api/posts/{id}", posts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(posts.getId().intValue()))
            .andExpect(jsonPath("$.postTitle").value(DEFAULT_POST_TITLE.toString()))
            .andExpect(jsonPath("$.postContent").value(DEFAULT_POST_CONTENT.toString()))
            .andExpect(jsonPath("$.videoURL").value(DEFAULT_VIDEO_URL.toString()))
            .andExpect(jsonPath("$.imageURL").value(DEFAULT_IMAGE_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPosts() throws Exception {
        // Get the posts
        restPostsMockMvc.perform(get("/api/posts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePosts() throws Exception {
        // Initialize the database
        postsRepository.saveAndFlush(posts);
        int databaseSizeBeforeUpdate = postsRepository.findAll().size();

        // Update the posts
        Posts updatedPosts = postsRepository.findOne(posts.getId());
        // Disconnect from session so that the updates on updatedPosts are not directly saved in db
        em.detach(updatedPosts);
        updatedPosts
            .postTitle(UPDATED_POST_TITLE)
            .postContent(UPDATED_POST_CONTENT)
            .videoURL(UPDATED_VIDEO_URL)
            .imageURL(UPDATED_IMAGE_URL);

        restPostsMockMvc.perform(put("/api/posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPosts)))
            .andExpect(status().isOk());

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate);
        Posts testPosts = postsList.get(postsList.size() - 1);
        assertThat(testPosts.getPostTitle()).isEqualTo(UPDATED_POST_TITLE);
        assertThat(testPosts.getPostContent()).isEqualTo(UPDATED_POST_CONTENT);
        assertThat(testPosts.getVideoURL()).isEqualTo(UPDATED_VIDEO_URL);
        assertThat(testPosts.getImageURL()).isEqualTo(UPDATED_IMAGE_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingPosts() throws Exception {
        int databaseSizeBeforeUpdate = postsRepository.findAll().size();

        // Create the Posts

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPostsMockMvc.perform(put("/api/posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posts)))
            .andExpect(status().isCreated());

        // Validate the Posts in the database
        List<Posts> postsList = postsRepository.findAll();
        assertThat(postsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePosts() throws Exception {
        // Initialize the database
        postsRepository.saveAndFlush(posts);
        int databaseSizeBeforeDelete = postsRepository.findAll().size();

        // Get the posts
        restPostsMockMvc.perform(delete("/api/posts/{id}", posts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Posts> postsList = postsRepository.findAll();
        assertThat(postsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Posts.class);
        Posts posts1 = new Posts();
        posts1.setId(1L);
        Posts posts2 = new Posts();
        posts2.setId(posts1.getId());
        assertThat(posts1).isEqualTo(posts2);
        posts2.setId(2L);
        assertThat(posts1).isNotEqualTo(posts2);
        posts1.setId(null);
        assertThat(posts1).isNotEqualTo(posts2);
    }
}
