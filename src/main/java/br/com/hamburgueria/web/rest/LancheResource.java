package br.com.hamburgueria.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.hamburgueria.domain.Lanche;

import br.com.hamburgueria.repository.LancheRepository;
import br.com.hamburgueria.web.rest.errors.BadRequestAlertException;
import br.com.hamburgueria.web.rest.util.HeaderUtil;
import br.com.hamburgueria.web.rest.util.PaginationUtil;
import br.com.hamburgueria.service.dto.LancheDTO;
import br.com.hamburgueria.service.mapper.LancheMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Lanche.
 */
@RestController
@RequestMapping("/api")
public class LancheResource {

    private final Logger log = LoggerFactory.getLogger(LancheResource.class);

    private static final String ENTITY_NAME = "lanche";

    private final LancheRepository lancheRepository;

    private final LancheMapper lancheMapper;

    public LancheResource(LancheRepository lancheRepository, LancheMapper lancheMapper) {
        this.lancheRepository = lancheRepository;
        this.lancheMapper = lancheMapper;
    }

    /**
     * POST  /lanches : Create a new lanche.
     *
     * @param lancheDTO the lancheDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lancheDTO, or with status 400 (Bad Request) if the lanche has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lanches")
    @Timed
    public ResponseEntity<LancheDTO> createLanche(@Valid @RequestBody LancheDTO lancheDTO) throws URISyntaxException {
        log.debug("REST request to save Lanche : {}", lancheDTO);
        if (lancheDTO.getId() != null) {
            throw new BadRequestAlertException("A new lanche cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lanche lanche = lancheMapper.toEntity(lancheDTO);
        lanche = lancheRepository.save(lanche);
        LancheDTO result = lancheMapper.toDto(lanche);
        return ResponseEntity.created(new URI("/api/lanches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lanches : Updates an existing lanche.
     *
     * @param lancheDTO the lancheDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lancheDTO,
     * or with status 400 (Bad Request) if the lancheDTO is not valid,
     * or with status 500 (Internal Server Error) if the lancheDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lanches")
    @Timed
    public ResponseEntity<LancheDTO> updateLanche(@Valid @RequestBody LancheDTO lancheDTO) throws URISyntaxException {
        log.debug("REST request to update Lanche : {}", lancheDTO);
        if (lancheDTO.getId() == null) {
            return createLanche(lancheDTO);
        }
        Lanche lanche = lancheMapper.toEntity(lancheDTO);
        lanche = lancheRepository.save(lanche);
        LancheDTO result = lancheMapper.toDto(lanche);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lancheDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lanches : get all the lanches.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lanches in body
     */
    @GetMapping("/lanches")
    @Timed
    public ResponseEntity<List<LancheDTO>> getAllLanches(Pageable pageable) {
        log.debug("REST request to get a page of Lanches");
        Page<Lanche> page = lancheRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/lanches");
        return new ResponseEntity<>(lancheMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /lanches/:id : get the "id" lanche.
     *
     * @param id the id of the lancheDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lancheDTO, or with status 404 (Not Found)
     */
    @GetMapping("/lanches/{id}")
    @Timed
    public ResponseEntity<LancheDTO> getLanche(@PathVariable Long id) {
        log.debug("REST request to get Lanche : {}", id);
        Lanche lanche = lancheRepository.findOne(id);
        LancheDTO lancheDTO = lancheMapper.toDto(lanche);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lancheDTO));
    }

    /**
     * DELETE  /lanches/:id : delete the "id" lanche.
     *
     * @param id the id of the lancheDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lanches/{id}")
    @Timed
    public ResponseEntity<Void> deleteLanche(@PathVariable Long id) {
        log.debug("REST request to delete Lanche : {}", id);
        lancheRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
