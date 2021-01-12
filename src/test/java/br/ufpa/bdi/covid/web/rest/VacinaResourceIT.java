package br.ufpa.bdi.covid.web.rest;

import br.ufpa.bdi.covid.VacinacaoCovidApp;
import br.ufpa.bdi.covid.domain.Vacina;
import br.ufpa.bdi.covid.repository.VacinaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VacinaResource} REST controller.
 */
@SpringBootTest(classes = VacinacaoCovidApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VacinaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_FABRICANTE = "AAAAAAAAAA";
    private static final String UPDATED_FABRICANTE = "BBBBBBBBBB";

    @Autowired
    private VacinaRepository vacinaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVacinaMockMvc;

    private Vacina vacina;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vacina createEntity(EntityManager em) {
        Vacina vacina = new Vacina()
            .nome(DEFAULT_NOME)
            .fabricante(DEFAULT_FABRICANTE);
        return vacina;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vacina createUpdatedEntity(EntityManager em) {
        Vacina vacina = new Vacina()
            .nome(UPDATED_NOME)
            .fabricante(UPDATED_FABRICANTE);
        return vacina;
    }

    @BeforeEach
    public void initTest() {
        vacina = createEntity(em);
    }

    @Test
    @Transactional
    public void createVacina() throws Exception {
        int databaseSizeBeforeCreate = vacinaRepository.findAll().size();
        // Create the Vacina
        restVacinaMockMvc.perform(post("/api/vacinas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vacina)))
            .andExpect(status().isCreated());

        // Validate the Vacina in the database
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeCreate + 1);
        Vacina testVacina = vacinaList.get(vacinaList.size() - 1);
        assertThat(testVacina.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testVacina.getFabricante()).isEqualTo(DEFAULT_FABRICANTE);
    }

    @Test
    @Transactional
    public void createVacinaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vacinaRepository.findAll().size();

        // Create the Vacina with an existing ID
        vacina.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVacinaMockMvc.perform(post("/api/vacinas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vacina)))
            .andExpect(status().isBadRequest());

        // Validate the Vacina in the database
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVacinas() throws Exception {
        // Initialize the database
        vacinaRepository.saveAndFlush(vacina);

        // Get all the vacinaList
        restVacinaMockMvc.perform(get("/api/vacinas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vacina.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].fabricante").value(hasItem(DEFAULT_FABRICANTE)));
    }
    
    @Test
    @Transactional
    public void getVacina() throws Exception {
        // Initialize the database
        vacinaRepository.saveAndFlush(vacina);

        // Get the vacina
        restVacinaMockMvc.perform(get("/api/vacinas/{id}", vacina.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vacina.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.fabricante").value(DEFAULT_FABRICANTE));
    }
    @Test
    @Transactional
    public void getNonExistingVacina() throws Exception {
        // Get the vacina
        restVacinaMockMvc.perform(get("/api/vacinas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVacina() throws Exception {
        // Initialize the database
        vacinaRepository.saveAndFlush(vacina);

        int databaseSizeBeforeUpdate = vacinaRepository.findAll().size();

        // Update the vacina
        Vacina updatedVacina = vacinaRepository.findById(vacina.getId()).get();
        // Disconnect from session so that the updates on updatedVacina are not directly saved in db
        em.detach(updatedVacina);
        updatedVacina
            .nome(UPDATED_NOME)
            .fabricante(UPDATED_FABRICANTE);

        restVacinaMockMvc.perform(put("/api/vacinas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVacina)))
            .andExpect(status().isOk());

        // Validate the Vacina in the database
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeUpdate);
        Vacina testVacina = vacinaList.get(vacinaList.size() - 1);
        assertThat(testVacina.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testVacina.getFabricante()).isEqualTo(UPDATED_FABRICANTE);
    }

    @Test
    @Transactional
    public void updateNonExistingVacina() throws Exception {
        int databaseSizeBeforeUpdate = vacinaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVacinaMockMvc.perform(put("/api/vacinas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vacina)))
            .andExpect(status().isBadRequest());

        // Validate the Vacina in the database
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVacina() throws Exception {
        // Initialize the database
        vacinaRepository.saveAndFlush(vacina);

        int databaseSizeBeforeDelete = vacinaRepository.findAll().size();

        // Delete the vacina
        restVacinaMockMvc.perform(delete("/api/vacinas/{id}", vacina.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
