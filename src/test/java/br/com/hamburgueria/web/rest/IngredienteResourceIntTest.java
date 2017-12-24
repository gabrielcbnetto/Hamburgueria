package br.com.hamburgueria.web.rest;

import br.com.hamburgueria.HamburgueriaApp;

import br.com.hamburgueria.domain.Ingrediente;
import br.com.hamburgueria.repository.IngredienteRepository;
import br.com.hamburgueria.service.dto.IngredienteDTO;
import br.com.hamburgueria.service.mapper.IngredienteMapper;
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
 * Test class for the IngredienteResource REST controller.
 *
 * @see IngredienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HamburgueriaApp.class)
public class IngredienteResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Double DEFAULT_VALOR = 1D;
    private static final Double UPDATED_VALOR = 2D;

    @Autowired
    private IngredienteRepository ingredienteRepository;

    @Autowired
    private IngredienteMapper ingredienteMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIngredienteMockMvc;

    private Ingrediente ingrediente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IngredienteResource ingredienteResource = new IngredienteResource(ingredienteRepository, ingredienteMapper);
        this.restIngredienteMockMvc = MockMvcBuilders.standaloneSetup(ingredienteResource)
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
    public static Ingrediente createEntity(EntityManager em) {
        Ingrediente ingrediente = new Ingrediente()
            .nome(DEFAULT_NOME)
            .valor(DEFAULT_VALOR);
        return ingrediente;
    }

    @Before
    public void initTest() {
        ingrediente = createEntity(em);
    }

    @Test
    @Transactional
    public void createIngrediente() throws Exception {
        int databaseSizeBeforeCreate = ingredienteRepository.findAll().size();

        // Create the Ingrediente
        IngredienteDTO ingredienteDTO = ingredienteMapper.toDto(ingrediente);
        restIngredienteMockMvc.perform(post("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredienteDTO)))
            .andExpect(status().isCreated());

        // Validate the Ingrediente in the database
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeCreate + 1);
        Ingrediente testIngrediente = ingredienteList.get(ingredienteList.size() - 1);
        assertThat(testIngrediente.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testIngrediente.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createIngredienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ingredienteRepository.findAll().size();

        // Create the Ingrediente with an existing ID
        ingrediente.setId(1L);
        IngredienteDTO ingredienteDTO = ingredienteMapper.toDto(ingrediente);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIngredienteMockMvc.perform(post("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredienteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Ingrediente in the database
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = ingredienteRepository.findAll().size();
        // set the field null
        ingrediente.setNome(null);

        // Create the Ingrediente, which fails.
        IngredienteDTO ingredienteDTO = ingredienteMapper.toDto(ingrediente);

        restIngredienteMockMvc.perform(post("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredienteDTO)))
            .andExpect(status().isBadRequest());

        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = ingredienteRepository.findAll().size();
        // set the field null
        ingrediente.setValor(null);

        // Create the Ingrediente, which fails.
        IngredienteDTO ingredienteDTO = ingredienteMapper.toDto(ingrediente);

        restIngredienteMockMvc.perform(post("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredienteDTO)))
            .andExpect(status().isBadRequest());

        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIngredientes() throws Exception {
        // Initialize the database
        ingredienteRepository.saveAndFlush(ingrediente);

        // Get all the ingredienteList
        restIngredienteMockMvc.perform(get("/api/ingredientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingrediente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())));
    }

    @Test
    @Transactional
    public void getIngrediente() throws Exception {
        // Initialize the database
        ingredienteRepository.saveAndFlush(ingrediente);

        // Get the ingrediente
        restIngredienteMockMvc.perform(get("/api/ingredientes/{id}", ingrediente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ingrediente.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIngrediente() throws Exception {
        // Get the ingrediente
        restIngredienteMockMvc.perform(get("/api/ingredientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIngrediente() throws Exception {
        // Initialize the database
        ingredienteRepository.saveAndFlush(ingrediente);
        int databaseSizeBeforeUpdate = ingredienteRepository.findAll().size();

        // Update the ingrediente
        Ingrediente updatedIngrediente = ingredienteRepository.findOne(ingrediente.getId());
        // Disconnect from session so that the updates on updatedIngrediente are not directly saved in db
        em.detach(updatedIngrediente);
        updatedIngrediente
            .nome(UPDATED_NOME)
            .valor(UPDATED_VALOR);
        IngredienteDTO ingredienteDTO = ingredienteMapper.toDto(updatedIngrediente);

        restIngredienteMockMvc.perform(put("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredienteDTO)))
            .andExpect(status().isOk());

        // Validate the Ingrediente in the database
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeUpdate);
        Ingrediente testIngrediente = ingredienteList.get(ingredienteList.size() - 1);
        assertThat(testIngrediente.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testIngrediente.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingIngrediente() throws Exception {
        int databaseSizeBeforeUpdate = ingredienteRepository.findAll().size();

        // Create the Ingrediente
        IngredienteDTO ingredienteDTO = ingredienteMapper.toDto(ingrediente);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIngredienteMockMvc.perform(put("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingredienteDTO)))
            .andExpect(status().isCreated());

        // Validate the Ingrediente in the database
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIngrediente() throws Exception {
        // Initialize the database
        ingredienteRepository.saveAndFlush(ingrediente);
        int databaseSizeBeforeDelete = ingredienteRepository.findAll().size();

        // Get the ingrediente
        restIngredienteMockMvc.perform(delete("/api/ingredientes/{id}", ingrediente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ingrediente.class);
        Ingrediente ingrediente1 = new Ingrediente();
        ingrediente1.setId(1L);
        Ingrediente ingrediente2 = new Ingrediente();
        ingrediente2.setId(ingrediente1.getId());
        assertThat(ingrediente1).isEqualTo(ingrediente2);
        ingrediente2.setId(2L);
        assertThat(ingrediente1).isNotEqualTo(ingrediente2);
        ingrediente1.setId(null);
        assertThat(ingrediente1).isNotEqualTo(ingrediente2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(IngredienteDTO.class);
        IngredienteDTO ingredienteDTO1 = new IngredienteDTO();
        ingredienteDTO1.setId(1L);
        IngredienteDTO ingredienteDTO2 = new IngredienteDTO();
        assertThat(ingredienteDTO1).isNotEqualTo(ingredienteDTO2);
        ingredienteDTO2.setId(ingredienteDTO1.getId());
        assertThat(ingredienteDTO1).isEqualTo(ingredienteDTO2);
        ingredienteDTO2.setId(2L);
        assertThat(ingredienteDTO1).isNotEqualTo(ingredienteDTO2);
        ingredienteDTO1.setId(null);
        assertThat(ingredienteDTO1).isNotEqualTo(ingredienteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(ingredienteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(ingredienteMapper.fromId(null)).isNull();
    }
}
