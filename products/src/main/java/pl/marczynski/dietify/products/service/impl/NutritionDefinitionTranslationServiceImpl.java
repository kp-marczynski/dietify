package pl.marczynski.dietify.products.service.impl;

import pl.marczynski.dietify.products.service.NutritionDefinitionTranslationService;
import pl.marczynski.dietify.products.domain.NutritionDefinitionTranslation;
import pl.marczynski.dietify.products.repository.NutritionDefinitionTranslationRepository;
import pl.marczynski.dietify.products.repository.search.NutritionDefinitionTranslationSearchRepository;
import pl.marczynski.dietify.products.service.dto.NutritionDefinitionTranslationDTO;
import pl.marczynski.dietify.products.service.mapper.NutritionDefinitionTranslationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link NutritionDefinitionTranslation}.
 */
@Service
@Transactional
public class NutritionDefinitionTranslationServiceImpl implements NutritionDefinitionTranslationService {

    private final Logger log = LoggerFactory.getLogger(NutritionDefinitionTranslationServiceImpl.class);

    private final NutritionDefinitionTranslationRepository nutritionDefinitionTranslationRepository;

    private final NutritionDefinitionTranslationMapper nutritionDefinitionTranslationMapper;

    private final NutritionDefinitionTranslationSearchRepository nutritionDefinitionTranslationSearchRepository;

    public NutritionDefinitionTranslationServiceImpl(NutritionDefinitionTranslationRepository nutritionDefinitionTranslationRepository, NutritionDefinitionTranslationMapper nutritionDefinitionTranslationMapper, NutritionDefinitionTranslationSearchRepository nutritionDefinitionTranslationSearchRepository) {
        this.nutritionDefinitionTranslationRepository = nutritionDefinitionTranslationRepository;
        this.nutritionDefinitionTranslationMapper = nutritionDefinitionTranslationMapper;
        this.nutritionDefinitionTranslationSearchRepository = nutritionDefinitionTranslationSearchRepository;
    }

    /**
     * Save a nutritionDefinitionTranslation.
     *
     * @param nutritionDefinitionTranslationDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public NutritionDefinitionTranslationDTO save(NutritionDefinitionTranslationDTO nutritionDefinitionTranslationDTO) {
        log.debug("Request to save NutritionDefinitionTranslation : {}", nutritionDefinitionTranslationDTO);
        NutritionDefinitionTranslation nutritionDefinitionTranslation = nutritionDefinitionTranslationMapper.toEntity(nutritionDefinitionTranslationDTO);
        nutritionDefinitionTranslation = nutritionDefinitionTranslationRepository.save(nutritionDefinitionTranslation);
        NutritionDefinitionTranslationDTO result = nutritionDefinitionTranslationMapper.toDto(nutritionDefinitionTranslation);
        nutritionDefinitionTranslationSearchRepository.save(nutritionDefinitionTranslation);
        return result;
    }

    /**
     * Get all the nutritionDefinitionTranslations.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<NutritionDefinitionTranslationDTO> findAll() {
        log.debug("Request to get all NutritionDefinitionTranslations");
        return nutritionDefinitionTranslationRepository.findAll().stream()
            .map(nutritionDefinitionTranslationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one nutritionDefinitionTranslation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NutritionDefinitionTranslationDTO> findOne(Long id) {
        log.debug("Request to get NutritionDefinitionTranslation : {}", id);
        return nutritionDefinitionTranslationRepository.findById(id)
            .map(nutritionDefinitionTranslationMapper::toDto);
    }

    /**
     * Delete the nutritionDefinitionTranslation by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NutritionDefinitionTranslation : {}", id);
        nutritionDefinitionTranslationRepository.deleteById(id);
        nutritionDefinitionTranslationSearchRepository.deleteById(id);
    }

    /**
     * Search for the nutritionDefinitionTranslation corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<NutritionDefinitionTranslationDTO> search(String query) {
        log.debug("Request to search NutritionDefinitionTranslations for query {}", query);
        return StreamSupport
            .stream(nutritionDefinitionTranslationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(nutritionDefinitionTranslationMapper::toDto)
            .collect(Collectors.toList());
    }
}
