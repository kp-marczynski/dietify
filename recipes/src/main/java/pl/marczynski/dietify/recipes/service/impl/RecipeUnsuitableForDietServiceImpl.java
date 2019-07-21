package pl.marczynski.dietify.recipes.service.impl;

import pl.marczynski.dietify.recipes.service.RecipeUnsuitableForDietService;
import pl.marczynski.dietify.recipes.domain.RecipeUnsuitableForDiet;
import pl.marczynski.dietify.recipes.repository.RecipeUnsuitableForDietRepository;
import pl.marczynski.dietify.recipes.repository.search.RecipeUnsuitableForDietSearchRepository;
import pl.marczynski.dietify.recipes.service.dto.RecipeUnsuitableForDietDTO;
import pl.marczynski.dietify.recipes.service.mapper.RecipeUnsuitableForDietMapper;
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
 * Service Implementation for managing {@link RecipeUnsuitableForDiet}.
 */
@Service
@Transactional
public class RecipeUnsuitableForDietServiceImpl implements RecipeUnsuitableForDietService {

    private final Logger log = LoggerFactory.getLogger(RecipeUnsuitableForDietServiceImpl.class);

    private final RecipeUnsuitableForDietRepository recipeUnsuitableForDietRepository;

    private final RecipeUnsuitableForDietMapper recipeUnsuitableForDietMapper;

    private final RecipeUnsuitableForDietSearchRepository recipeUnsuitableForDietSearchRepository;

    public RecipeUnsuitableForDietServiceImpl(RecipeUnsuitableForDietRepository recipeUnsuitableForDietRepository, RecipeUnsuitableForDietMapper recipeUnsuitableForDietMapper, RecipeUnsuitableForDietSearchRepository recipeUnsuitableForDietSearchRepository) {
        this.recipeUnsuitableForDietRepository = recipeUnsuitableForDietRepository;
        this.recipeUnsuitableForDietMapper = recipeUnsuitableForDietMapper;
        this.recipeUnsuitableForDietSearchRepository = recipeUnsuitableForDietSearchRepository;
    }

    /**
     * Save a recipeUnsuitableForDiet.
     *
     * @param recipeUnsuitableForDietDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RecipeUnsuitableForDietDTO save(RecipeUnsuitableForDietDTO recipeUnsuitableForDietDTO) {
        log.debug("Request to save RecipeUnsuitableForDiet : {}", recipeUnsuitableForDietDTO);
        RecipeUnsuitableForDiet recipeUnsuitableForDiet = recipeUnsuitableForDietMapper.toEntity(recipeUnsuitableForDietDTO);
        recipeUnsuitableForDiet = recipeUnsuitableForDietRepository.save(recipeUnsuitableForDiet);
        RecipeUnsuitableForDietDTO result = recipeUnsuitableForDietMapper.toDto(recipeUnsuitableForDiet);
        recipeUnsuitableForDietSearchRepository.save(recipeUnsuitableForDiet);
        return result;
    }

    /**
     * Get all the recipeUnsuitableForDiets.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecipeUnsuitableForDietDTO> findAll() {
        log.debug("Request to get all RecipeUnsuitableForDiets");
        return recipeUnsuitableForDietRepository.findAll().stream()
            .map(recipeUnsuitableForDietMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one recipeUnsuitableForDiet by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RecipeUnsuitableForDietDTO> findOne(Long id) {
        log.debug("Request to get RecipeUnsuitableForDiet : {}", id);
        return recipeUnsuitableForDietRepository.findById(id)
            .map(recipeUnsuitableForDietMapper::toDto);
    }

    /**
     * Delete the recipeUnsuitableForDiet by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RecipeUnsuitableForDiet : {}", id);
        recipeUnsuitableForDietRepository.deleteById(id);
        recipeUnsuitableForDietSearchRepository.deleteById(id);
    }

    /**
     * Search for the recipeUnsuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RecipeUnsuitableForDietDTO> search(String query) {
        log.debug("Request to search RecipeUnsuitableForDiets for query {}", query);
        return StreamSupport
            .stream(recipeUnsuitableForDietSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(recipeUnsuitableForDietMapper::toDto)
            .collect(Collectors.toList());
    }
}
