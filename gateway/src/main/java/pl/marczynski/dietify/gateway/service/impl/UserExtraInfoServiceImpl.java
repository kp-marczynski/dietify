package pl.marczynski.dietify.gateway.service.impl;

import pl.marczynski.dietify.gateway.service.UserExtraInfoService;
import pl.marczynski.dietify.gateway.domain.UserExtraInfo;
import pl.marczynski.dietify.gateway.repository.UserExtraInfoRepository;
import pl.marczynski.dietify.gateway.repository.search.UserExtraInfoSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link UserExtraInfo}.
 */
@Service
@Transactional
public class UserExtraInfoServiceImpl implements UserExtraInfoService {

    private final Logger log = LoggerFactory.getLogger(UserExtraInfoServiceImpl.class);

    private final UserExtraInfoRepository userExtraInfoRepository;

    private final UserExtraInfoSearchRepository userExtraInfoSearchRepository;

    public UserExtraInfoServiceImpl(UserExtraInfoRepository userExtraInfoRepository, UserExtraInfoSearchRepository userExtraInfoSearchRepository) {
        this.userExtraInfoRepository = userExtraInfoRepository;
        this.userExtraInfoSearchRepository = userExtraInfoSearchRepository;
    }

    /**
     * Save a userExtraInfo.
     *
     * @param userExtraInfo the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserExtraInfo save(UserExtraInfo userExtraInfo) {
        log.debug("Request to save UserExtraInfo : {}", userExtraInfo);
        UserExtraInfo result = userExtraInfoRepository.save(userExtraInfo);
        userExtraInfoSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the userExtraInfos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserExtraInfo> findAll() {
        log.debug("Request to get all UserExtraInfos");
        return userExtraInfoRepository.findAll();
    }


    /**
     * Get one userExtraInfo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserExtraInfo> findOne(Long id) {
        log.debug("Request to get UserExtraInfo : {}", id);
        return userExtraInfoRepository.findById(id);
    }

    /**
     * Delete the userExtraInfo by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserExtraInfo : {}", id);
        userExtraInfoRepository.deleteById(id);
        userExtraInfoSearchRepository.deleteById(id);
    }

    /**
     * Search for the userExtraInfo corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserExtraInfo> search(String query) {
        log.debug("Request to search UserExtraInfos for query {}", query);
        return StreamSupport
            .stream(userExtraInfoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
