package pl.marczynski.dietify.appointments.web.rest;

import pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestionTemplate;
import pl.marczynski.dietify.appointments.service.CustomNutritionalInterviewQuestionTemplateService;
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
 * REST controller for managing {@link pl.marczynski.dietify.appointments.domain.CustomNutritionalInterviewQuestionTemplate}.
 */
@RestController
@RequestMapping("/api")
public class CustomNutritionalInterviewQuestionTemplateResource {

    private final Logger log = LoggerFactory.getLogger(CustomNutritionalInterviewQuestionTemplateResource.class);

    private static final String ENTITY_NAME = "appointmentsCustomNutritionalInterviewQuestionTemplate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomNutritionalInterviewQuestionTemplateService customNutritionalInterviewQuestionTemplateService;

    public CustomNutritionalInterviewQuestionTemplateResource(CustomNutritionalInterviewQuestionTemplateService customNutritionalInterviewQuestionTemplateService) {
        this.customNutritionalInterviewQuestionTemplateService = customNutritionalInterviewQuestionTemplateService;
    }

    /**
     * {@code POST  /custom-nutritional-interview-question-templates} : Create a new customNutritionalInterviewQuestionTemplate.
     *
     * @param customNutritionalInterviewQuestionTemplate the customNutritionalInterviewQuestionTemplate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customNutritionalInterviewQuestionTemplate, or with status {@code 400 (Bad Request)} if the customNutritionalInterviewQuestionTemplate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/custom-nutritional-interview-question-templates")
    public ResponseEntity<CustomNutritionalInterviewQuestionTemplate> createCustomNutritionalInterviewQuestionTemplate(@Valid @RequestBody CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate) throws URISyntaxException {
        log.debug("REST request to save CustomNutritionalInterviewQuestionTemplate : {}", customNutritionalInterviewQuestionTemplate);
        if (customNutritionalInterviewQuestionTemplate.getId() != null) {
            throw new BadRequestAlertException("A new customNutritionalInterviewQuestionTemplate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomNutritionalInterviewQuestionTemplate result = customNutritionalInterviewQuestionTemplateService.save(customNutritionalInterviewQuestionTemplate);
        return ResponseEntity.created(new URI("/api/custom-nutritional-interview-question-templates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /custom-nutritional-interview-question-templates} : Updates an existing customNutritionalInterviewQuestionTemplate.
     *
     * @param customNutritionalInterviewQuestionTemplate the customNutritionalInterviewQuestionTemplate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customNutritionalInterviewQuestionTemplate,
     * or with status {@code 400 (Bad Request)} if the customNutritionalInterviewQuestionTemplate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customNutritionalInterviewQuestionTemplate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/custom-nutritional-interview-question-templates")
    public ResponseEntity<CustomNutritionalInterviewQuestionTemplate> updateCustomNutritionalInterviewQuestionTemplate(@Valid @RequestBody CustomNutritionalInterviewQuestionTemplate customNutritionalInterviewQuestionTemplate) throws URISyntaxException {
        log.debug("REST request to update CustomNutritionalInterviewQuestionTemplate : {}", customNutritionalInterviewQuestionTemplate);
        if (customNutritionalInterviewQuestionTemplate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomNutritionalInterviewQuestionTemplate result = customNutritionalInterviewQuestionTemplateService.save(customNutritionalInterviewQuestionTemplate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customNutritionalInterviewQuestionTemplate.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /custom-nutritional-interview-question-templates} : get all the customNutritionalInterviewQuestionTemplates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customNutritionalInterviewQuestionTemplates in body.
     */
    @GetMapping("/custom-nutritional-interview-question-templates")
    public List<CustomNutritionalInterviewQuestionTemplate> getAllCustomNutritionalInterviewQuestionTemplates() {
        log.debug("REST request to get all CustomNutritionalInterviewQuestionTemplates");
        return customNutritionalInterviewQuestionTemplateService.findAll();
    }

    /**
     * {@code GET  /custom-nutritional-interview-question-templates/:id} : get the "id" customNutritionalInterviewQuestionTemplate.
     *
     * @param id the id of the customNutritionalInterviewQuestionTemplate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customNutritionalInterviewQuestionTemplate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/custom-nutritional-interview-question-templates/{id}")
    public ResponseEntity<CustomNutritionalInterviewQuestionTemplate> getCustomNutritionalInterviewQuestionTemplate(@PathVariable Long id) {
        log.debug("REST request to get CustomNutritionalInterviewQuestionTemplate : {}", id);
        Optional<CustomNutritionalInterviewQuestionTemplate> customNutritionalInterviewQuestionTemplate = customNutritionalInterviewQuestionTemplateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customNutritionalInterviewQuestionTemplate);
    }

    /**
     * {@code DELETE  /custom-nutritional-interview-question-templates/:id} : delete the "id" customNutritionalInterviewQuestionTemplate.
     *
     * @param id the id of the customNutritionalInterviewQuestionTemplate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/custom-nutritional-interview-question-templates/{id}")
    public ResponseEntity<Void> deleteCustomNutritionalInterviewQuestionTemplate(@PathVariable Long id) {
        log.debug("REST request to delete CustomNutritionalInterviewQuestionTemplate : {}", id);
        customNutritionalInterviewQuestionTemplateService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
