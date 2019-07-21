package pl.marczynski.dietify.gateway.web.rest;

import pl.marczynski.dietify.gateway.service.UserExtraInfoService;
import pl.marczynski.dietify.gateway.web.rest.errors.BadRequestAlertException;
import pl.marczynski.dietify.gateway.service.dto.UserExtraInfoDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link pl.marczynski.dietify.gateway.domain.UserExtraInfo}.
 */
@RestController
@RequestMapping("/api")
public class UserExtraInfoResource {

    private final Logger log = LoggerFactory.getLogger(UserExtraInfoResource.class);

    private static final String ENTITY_NAME = "userExtraInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserExtraInfoService userExtraInfoService;

    public UserExtraInfoResource(UserExtraInfoService userExtraInfoService) {
        this.userExtraInfoService = userExtraInfoService;
    }

    /**
     * {@code POST  /user-extra-infos} : Create a new userExtraInfo.
     *
     * @param userExtraInfoDTO the userExtraInfoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userExtraInfoDTO, or with status {@code 400 (Bad Request)} if the userExtraInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-extra-infos")
    public ResponseEntity<UserExtraInfoDTO> createUserExtraInfo(@Valid @RequestBody UserExtraInfoDTO userExtraInfoDTO) throws URISyntaxException {
        log.debug("REST request to save UserExtraInfo : {}", userExtraInfoDTO);
        if (userExtraInfoDTO.getId() != null) {
            throw new BadRequestAlertException("A new userExtraInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserExtraInfoDTO result = userExtraInfoService.save(userExtraInfoDTO);
        return ResponseEntity.created(new URI("/api/user-extra-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-extra-infos} : Updates an existing userExtraInfo.
     *
     * @param userExtraInfoDTO the userExtraInfoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userExtraInfoDTO,
     * or with status {@code 400 (Bad Request)} if the userExtraInfoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userExtraInfoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-extra-infos")
    public ResponseEntity<UserExtraInfoDTO> updateUserExtraInfo(@Valid @RequestBody UserExtraInfoDTO userExtraInfoDTO) throws URISyntaxException {
        log.debug("REST request to update UserExtraInfo : {}", userExtraInfoDTO);
        if (userExtraInfoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserExtraInfoDTO result = userExtraInfoService.save(userExtraInfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userExtraInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-extra-infos} : get all the userExtraInfos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userExtraInfos in body.
     */
    @GetMapping("/user-extra-infos")
    public List<UserExtraInfoDTO> getAllUserExtraInfos() {
        log.debug("REST request to get all UserExtraInfos");
        return userExtraInfoService.findAll();
    }

    /**
     * {@code GET  /user-extra-infos/:id} : get the "id" userExtraInfo.
     *
     * @param id the id of the userExtraInfoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userExtraInfoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-extra-infos/{id}")
    public ResponseEntity<UserExtraInfoDTO> getUserExtraInfo(@PathVariable Long id) {
        log.debug("REST request to get UserExtraInfo : {}", id);
        Optional<UserExtraInfoDTO> userExtraInfoDTO = userExtraInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userExtraInfoDTO);
    }

    /**
     * {@code DELETE  /user-extra-infos/:id} : delete the "id" userExtraInfo.
     *
     * @param id the id of the userExtraInfoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-extra-infos/{id}")
    public ResponseEntity<Void> deleteUserExtraInfo(@PathVariable Long id) {
        log.debug("REST request to delete UserExtraInfo : {}", id);
        userExtraInfoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/user-extra-infos?query=:query} : search for the userExtraInfo corresponding
     * to the query.
     *
     * @param query the query of the userExtraInfo search.
     * @return the result of the search.
     */
    @GetMapping("/_search/user-extra-infos")
    public List<UserExtraInfoDTO> searchUserExtraInfos(@RequestParam String query) {
        log.debug("REST request to search UserExtraInfos for query {}", query);
        return userExtraInfoService.search(query);
    }

}
