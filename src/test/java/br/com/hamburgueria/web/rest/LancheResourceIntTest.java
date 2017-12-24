package br.com.hamburgueria.web.rest;

import br.com.hamburgueria.HamburgueriaApp;

import br.com.hamburgueria.domain.Lanche;
import br.com.hamburgueria.repository.LancheRepository;
import br.com.hamburgueria.service.dto.LancheDTO;
import br.com.hamburgueria.service.mapper.LancheMapper;
import br.com.hamburgueria.web.rest.errors.ExceptionTranslator;

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

import static br.com.hamburgueria.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LancheResource REST controller.
 *
 * @see LancheResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HamburgueriaApp.class)
public class LancheResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private LancheRepository lancheRepository;

    @Autowired
    private LancheMapper lancheMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLancheMockMvc;

    private Lanche lanche;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LancheResource lancheResource = new LancheResource(lancheRepository, lancheMapper);
        this.restLancheMockMvc = MockMvcBuilders.standaloneSetup(lancheResource)
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
    public static Lanche createEntity(EntityManager em) {
        Lanche lanche = new Lanche()
            .nome(DEFAULT_NOME);
        return lanche;
    }

    @Before
    public void initTest() {
        lanche = createEntity(em);
    }

    @Test
    @Transactional
    public void createLanche() throws Exception {
        int databaseSizeBeforeCreate = lancheRepository.findAll().size();

        // Create the Lanche
        LancheDTO lancheDTO = lancheMapper.toDto(lanche);
        restLancheMockMvc.perform(post("/api/lanches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lancheDTO)))
            .andExpect(status().isCreated());

        // Validate the Lanche in the database
        List<Lanche> lancheList = lancheRepository.findAll();
        assertThat(lancheList).hasSize(databaseSizeBeforeCreate + 1);
        Lanche testLanche = lancheList.get(lancheList.size() - 1);
        assertThat(testLanche.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createLancheWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lancheRepository.findAll().size();

        // Create the Lanche with an existing ID
        lanche.setId(1L);
        LancheDTO lancheDTO = lancheMapper.toDto(lanche);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLancheMockMvc.perform(post("/api/lanches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lancheDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lanche in the database
        List<Lanche> lancheList = lancheRepository.findAll();
        assertThat(lancheList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = lancheRepository.findAll().size();
        // set the field null
        lanche.setNome(null);

        // Create the Lanche, which fails.
        LancheDTO lancheDTO = lancheMapper.toDto(lanche);

        restLancheMockMvc.perform(post("/api/lanches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lancheDTO)))
            .andExpect(status().isBadRequest());

        List<Lanche> lancheList = lancheRepository.findAll();
        assertThat(lancheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLanches() throws Exception {
        // Initialize the database
        lancheRepository.saveAndFlush(lanche);

        // Get all the lancheList
        restLancheMockMvc.perform(get("/api/lanches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lanche.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }

    @Test
    @Transactional
    public void getLanche() throws Exception {
        // Initialize the database
        lancheRepository.saveAndFlush(lanche);

        // Get the lanche
        restLancheMockMvc.perform(get("/api/lanches/{id}", lanche.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lanche.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLanche() throws Exception {
        // Get the lanche
        restLancheMockMvc.perform(get("/api/lanches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLanche() throws Exception {
        // Initialize the database
        lancheRepository.saveAndFlush(lanche);
        int databaseSizeBeforeUpdate = lancheRepository.findAll().size();

        // Update the lanche
        Lanche updatedLanche = lancheRepository.findOne(lanche.getId());
        // Disconnect from session so that the updates on updatedLanche are not directly saved in db
        em.detach(updatedLanche);
        updatedLanche
            .nome(UPDATED_NOME);
        LancheDTO lancheDTO = lancheMapper.toDto(updatedLanche);

        restLancheMockMvc.perform(put("/api/lanches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lancheDTO)))
            .andExpect(status().isOk());

        // Validate the Lanche in the database
        List<Lanche> lancheList = lancheRepository.findAll();
        assertThat(lancheList).hasSize(databaseSizeBeforeUpdate);
        Lanche testLanche = lancheList.get(lancheList.size() - 1);
        assertThat(testLanche.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingLanche() throws Exception {
        int databaseSizeBeforeUpdate = lancheRepository.findAll().size();

        // Create the Lanche
        LancheDTO lancheDTO = lancheMapper.toDto(lanche);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLancheMockMvc.perform(put("/api/lanches")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lancheDTO)))
            .andExpect(status().isCreated());

        // Validate the Lanche in the database
        List<Lanche> lancheList = lancheRepository.findAll();
        assertThat(lancheList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLanche() throws Exception {
        // Initialize the database
        lancheRepository.saveAndFlush(lanche);
        int databaseSizeBeforeDelete = lancheRepository.findAll().size();

        // Get the lanche
        restLancheMockMvc.perform(delete("/api/lanches/{id}", lanche.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Lanche> lancheList = lancheRepository.findAll();
        assertThat(lancheList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lanche.class);
        Lanche lanche1 = new Lanche();
        lanche1.setId(1L);
        Lanche lanche2 = new Lanche();
        lanche2.setId(lanche1.getId());
        assertThat(lanche1).isEqualTo(lanche2);
        lanche2.setId(2L);
        assertThat(lanche1).isNotEqualTo(lanche2);
        lanche1.setId(null);
        assertThat(lanche1).isNotEqualTo(lanche2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LancheDTO.class);
        LancheDTO lancheDTO1 = new LancheDTO();
        lancheDTO1.setId(1L);
        LancheDTO lancheDTO2 = new LancheDTO();
        assertThat(lancheDTO1).isNotEqualTo(lancheDTO2);
        lancheDTO2.setId(lancheDTO1.getId());
        assertThat(lancheDTO1).isEqualTo(lancheDTO2);
        lancheDTO2.setId(2L);
        assertThat(lancheDTO1).isNotEqualTo(lancheDTO2);
        lancheDTO1.setId(null);
        assertThat(lancheDTO1).isNotEqualTo(lancheDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(lancheMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(lancheMapper.fromId(null)).isNull();
    }
}
