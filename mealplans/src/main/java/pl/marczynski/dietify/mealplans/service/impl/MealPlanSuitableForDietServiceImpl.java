package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealPlanSuitableForDietService;
import pl.marczynski.dietify.mealplans.domain.MealPlanSuitableForDiet;
import pl.marczynski.dietify.mealplans.repository.MealPlanSuitableForDietRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealPlanSuitableForDietSearchRepository;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanSuitableForDietDTO;
import pl.marczynski.dietify.mealplans.service.mapper.MealPlanSuitableForDietMapper;
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
 * Service Implementation for managing {@link MealPlanSuitableForDiet}.
 */
@Service
@Transactional
public class MealPlanSuitableForDietServiceImpl implements MealPlanSuitableForDietService {

    private final Logger log = LoggerFactory.getLogger(MealPlanSuitableForDietServiceImpl.class);

    private final MealPlanSuitableForDietRepository mealPlanSuitableForDietRepository;

    private final MealPlanSuitableForDietMapper mealPlanSuitableForDietMapper;

    private final MealPlanSuitableForDietSearchRepository mealPlanSuitableForDietSearchRepository;

    public MealPlanSuitableForDietServiceImpl(MealPlanSuitableForDietRepository mealPlanSuitableForDietRepository, MealPlanSuitableForDietMapper mealPlanSuitableForDietMapper, MealPlanSuitableForDietSearchRepository mealPlanSuitableForDietSearchRepository) {
        this.mealPlanSuitableForDietRepository = mealPlanSuitableForDietRepository;
        this.mealPlanSuitableForDietMapper = mealPlanSuitableForDietMapper;
        this.mealPlanSuitableForDietSearchRepository = mealPlanSuitableForDietSearchRepository;
    }

    /**
     * Save a mealPlanSuitableForDiet.
     *
     * @param mealPlanSuitableForDietDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealPlanSuitableForDietDTO save(MealPlanSuitableForDietDTO mealPlanSuitableForDietDTO) {
        log.debug("Request to save MealPlanSuitableForDiet : {}", mealPlanSuitableForDietDTO);
        MealPlanSuitableForDiet mealPlanSuitableForDiet = mealPlanSuitableForDietMapper.toEntity(mealPlanSuitableForDietDTO);
        mealPlanSuitableForDiet = mealPlanSuitableForDietRepository.save(mealPlanSuitableForDiet);
        MealPlanSuitableForDietDTO result = mealPlanSuitableForDietMapper.toDto(mealPlanSuitableForDiet);
        mealPlanSuitableForDietSearchRepository.save(mealPlanSuitableForDiet);
        return result;
    }

    /**
     * Get all the mealPlanSuitableForDiets.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealPlanSuitableForDietDTO> findAll() {
        log.debug("Request to get all MealPlanSuitableForDiets");
        return mealPlanSuitableForDietRepository.findAll().stream()
            .map(mealPlanSuitableForDietMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one mealPlanSuitableForDiet by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealPlanSuitableForDietDTO> findOne(Long id) {
        log.debug("Request to get MealPlanSuitableForDiet : {}", id);
        return mealPlanSuitableForDietRepository.findById(id)
            .map(mealPlanSuitableForDietMapper::toDto);
    }

    /**
     * Delete the mealPlanSuitableForDiet by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealPlanSuitableForDiet : {}", id);
        mealPlanSuitableForDietRepository.deleteById(id);
        mealPlanSuitableForDietSearchRepository.deleteById(id);
    }

    /**
     * Search for the mealPlanSuitableForDiet corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealPlanSuitableForDietDTO> search(String query) {
        log.debug("Request to search MealPlanSuitableForDiets for query {}", query);
        return StreamSupport
            .stream(mealPlanSuitableForDietSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(mealPlanSuitableForDietMapper::toDto)
            .collect(Collectors.toList());
    }
}
