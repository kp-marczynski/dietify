package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestion;
import pl.marczynski.dietify.appointments.service.CustomNutritionalInterviewQuestionService;
import pl.marczynski.dietify.appointments.web.rest.errors.BadRequestAlertException;

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

/**
 * REST controller for managing {@link pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestion}.
 */
@RestController
@RequestMapping("/api")
public class CustomNutritionalInterviewQuestionResource {

    private final Logger log = LoggerFactory.getLogger(CustomNutritionalInterviewQuestionResource.class);

    private static final String ENTITY_NAME = "appointmentsCustomNutritionalInterviewQuestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomNutritionalInterviewQuestionService customNutritionalInterviewQuestionService;

    public CustomNutritionalInterviewQuestionResource(CustomNutritionalInterviewQuestionService customNutritionalInterviewQuestionService) {
        this.customNutritionalInterviewQuestionService = customNutritionalInterviewQuestionService;
    }

    /**
     * {@code POST  /custom-nutritional-interview-questions} : Create a new customNutritionalInterviewQuestion.
     *
     * @param customNutritionalInterviewQuestion the customNutritionalInterviewQuestion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customNutritionalInterviewQuestion, or with status {@code 400 (Bad Request)} if the customNutritionalInterviewQuestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/custom-nutritional-interview-questions")
    public ResponseEntity<CustomNutritionalInterviewQuestion> createCustomNutritionalInterviewQuestion(@Valid @RequestBody CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion) throws URISyntaxException {
        log.debug("REST request to save CustomNutritionalInterviewQuestion : {}", customNutritionalInterviewQuestion);
        if (customNutritionalInterviewQuestion.getId() != null) {
            throw new BadRequestAlertException("A new customNutritionalInterviewQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomNutritionalInterviewQuestion result = customNutritionalInterviewQuestionService.save(customNutritionalInterviewQuestion);
        return ResponseEntity.created(new URI("/api/custom-nutritional-interview-questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /custom-nutritional-interview-questions} : Updates an existing customNutritionalInterviewQuestion.
     *
     * @param customNutritionalInterviewQuestion the customNutritionalInterviewQuestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customNutritionalInterviewQuestion,
     * or with status {@code 400 (Bad Request)} if the customNutritionalInterviewQuestion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customNutritionalInterviewQuestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/custom-nutritional-interview-questions")
    public ResponseEntity<CustomNutritionalInterviewQuestion> updateCustomNutritionalInterviewQuestion(@Valid @RequestBody CustomNutritionalInterviewQuestion customNutritionalInterviewQuestion) throws URISyntaxException {
        log.debug("REST request to update CustomNutritionalInterviewQuestion : {}", customNutritionalInterviewQuestion);
        if (customNutritionalInterviewQuestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomNutritionalInterviewQuestion result = customNutritionalInterviewQuestionService.save(customNutritionalInterviewQuestion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customNutritionalInterviewQuestion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /custom-nutritional-interview-questions} : get all the customNutritionalInterviewQuestions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customNutritionalInterviewQuestions in body.
     */
    @GetMapping("/custom-nutritional-interview-questions")
    public List<CustomNutritionalInterviewQuestion> getAllCustomNutritionalInterviewQuestions() {
        log.debug("REST request to get all CustomNutritionalInterviewQuestions");
        return customNutritionalInterviewQuestionService.findAll();
    }

    /**
     * {@code GET  /custom-nutritional-interview-questions/:id} : get the "id" customNutritionalInterviewQuestion.
     *
     * @param id the id of the customNutritionalInterviewQuestion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customNutritionalInterviewQuestion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/custom-nutritional-interview-questions/{id}")
    public ResponseEntity<CustomNutritionalInterviewQuestion> getCustomNutritionalInterviewQuestion(@PathVariable Long id) {
        log.debug("REST request to get CustomNutritionalInterviewQuestion : {}", id);
        Optional<CustomNutritionalInterviewQuestion> customNutritionalInterviewQuestion = customNutritionalInterviewQuestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customNutritionalInterviewQuestion);
    }

    /**
     * {@code DELETE  /custom-nutritional-interview-questions/:id} : delete the "id" customNutritionalInterviewQuestion.
     *
     * @param id the id of the customNutritionalInterviewQuestion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/custom-nutritional-interview-questions/{id}")
    public ResponseEntity<Void> deleteCustomNutritionalInterviewQuestion(@PathVariable Long id) {
        log.debug("REST request to delete CustomNutritionalInterviewQuestion : {}", id);
        customNutritionalInterviewQuestionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
