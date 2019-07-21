package pl.marczynski.dietify.products.service;

import pl.marczynski.dietify.products.service.dto.NutritionDataDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.products.domain.NutritionData}.
 */
public interface NutritionDataService {

    /**
     * Save a nutritionData.
     *
     * @param nutritionDataDTO the entity to save.
     * @return the persisted entity.
     */
    NutritionDataDTO save(NutritionDataDTO nutritionDataDTO);

    /**
     * Get all the nutritionData.
     *
     * @return the list of entities.
     */
    List<NutritionDataDTO> findAll();


    /**
     * Get the "id" nutritionData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NutritionDataDTO> findOne(Long id);

    /**
     * Delete the "id" nutritionData.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the nutritionData corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<NutritionDataDTO> search(String query);
}
