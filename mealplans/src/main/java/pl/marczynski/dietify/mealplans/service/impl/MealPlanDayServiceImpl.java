package pl.marczynski.dietify.mealplans.service.impl;

import pl.marczynski.dietify.mealplans.service.MealPlanDayService;
import pl.marczynski.dietify.mealplans.domain.MealPlanDay;
import pl.marczynski.dietify.mealplans.repository.MealPlanDayRepository;
import pl.marczynski.dietify.mealplans.repository.search.MealPlanDaySearchRepository;
import pl.marczynski.dietify.mealplans.service.dto.MealPlanDayDTO;
import pl.marczynski.dietify.mealplans.service.mapper.MealPlanDayMapper;
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
 * Service Implementation for managing {@link MealPlanDay}.
 */
@Service
@Transactional
public class MealPlanDayServiceImpl implements MealPlanDayService {

    private final Logger log = LoggerFactory.getLogger(MealPlanDayServiceImpl.class);

    private final MealPlanDayRepository mealPlanDayRepository;

    private final MealPlanDayMapper mealPlanDayMapper;

    private final MealPlanDaySearchRepository mealPlanDaySearchRepository;

    public MealPlanDayServiceImpl(MealPlanDayRepository mealPlanDayRepository, MealPlanDayMapper mealPlanDayMapper, MealPlanDaySearchRepository mealPlanDaySearchRepository) {
        this.mealPlanDayRepository = mealPlanDayRepository;
        this.mealPlanDayMapper = mealPlanDayMapper;
        this.mealPlanDaySearchRepository = mealPlanDaySearchRepository;
    }

    /**
     * Save a mealPlanDay.
     *
     * @param mealPlanDayDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public MealPlanDayDTO save(MealPlanDayDTO mealPlanDayDTO) {
        log.debug("Request to save MealPlanDay : {}", mealPlanDayDTO);
        MealPlanDay mealPlanDay = mealPlanDayMapper.toEntity(mealPlanDayDTO);
        mealPlanDay = mealPlanDayRepository.save(mealPlanDay);
        MealPlanDayDTO result = mealPlanDayMapper.toDto(mealPlanDay);
        mealPlanDaySearchRepository.save(mealPlanDay);
        return result;
    }

    /**
     * Get all the mealPlanDays.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealPlanDayDTO> findAll() {
        log.debug("Request to get all MealPlanDays");
        return mealPlanDayRepository.findAll().stream()
            .map(mealPlanDayMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one mealPlanDay by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MealPlanDayDTO> findOne(Long id) {
        log.debug("Request to get MealPlanDay : {}", id);
        return mealPlanDayRepository.findById(id)
            .map(mealPlanDayMapper::toDto);
    }

    /**
     * Delete the mealPlanDay by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MealPlanDay : {}", id);
        mealPlanDayRepository.deleteById(id);
        mealPlanDaySearchRepository.deleteById(id);
    }

    /**
     * Search for the mealPlanDay corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<MealPlanDayDTO> search(String query) {
        log.debug("Request to search MealPlanDays for query {}", query);
        return StreamSupport
            .stream(mealPlanDaySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(mealPlanDayMapper::toDto)
            .collect(Collectors.toList());
    }
}
