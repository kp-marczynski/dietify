package pl.marczynski.dietify.gateway.service;

import pl.marczynski.dietify.gateway.service.dto.UserExtraInfoDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link pl.marczynski.dietify.gateway.domain.UserExtraInfo}.
 */
public interface UserExtraInfoService {

    /**
     * Save a userExtraInfo.
     *
     * @param userExtraInfoDTO the entity to save.
     * @return the persisted entity.
     */
    UserExtraInfoDTO save(UserExtraInfoDTO userExtraInfoDTO);

    /**
     * Get all the userExtraInfos.
     *
     * @return the list of entities.
     */
    List<UserExtraInfoDTO> findAll();


    /**
     * Get the "id" userExtraInfo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserExtraInfoDTO> findOne(Long id);

    /**
     * Delete the "id" userExtraInfo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the userExtraInfo corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<UserExtraInfoDTO> search(String query);
}
