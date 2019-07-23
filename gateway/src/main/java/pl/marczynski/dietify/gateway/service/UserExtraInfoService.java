package pl.marczynski.dietify.gateway.service;

import pl.marczynski.dietify.gateway.domain.UserExtraInfo;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link UserExtraInfo}.
 */
public interface UserExtraInfoService {

    /**
     * Save a userExtraInfo.
     *
     * @param userExtraInfo the entity to save.
     * @return the persisted entity.
     */
    UserExtraInfo save(UserExtraInfo userExtraInfo);

    /**
     * Get all the userExtraInfos.
     *
     * @return the list of entities.
     */
    List<UserExtraInfo> findAll();


    /**
     * Get the "id" userExtraInfo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserExtraInfo> findOne(Long id);

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
    List<UserExtraInfo> search(String query);
}
