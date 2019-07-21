package pl.marczynski.dietify.gateway.service.impl;

import pl.marczynski.dietify.gateway.service.UserExtraInfoService;
import pl.marczynski.dietify.gateway.domain.UserExtraInfo;
import pl.marczynski.dietify.gateway.repository.UserExtraInfoRepository;
import pl.marczynski.dietify.gateway.repository.search.UserExtraInfoSearchRepository;
import pl.marczynski.dietify.gateway.service.dto.UserExtraInfoDTO;
import pl.marczynski.dietify.gateway.service.mapper.UserExtraInfoMapper;
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
 * Service Implementation for managing {@link UserExtraInfo}.
 */
@Service
@Transactional
public class UserExtraInfoServiceImpl implements UserExtraInfoService {

    private final Logger log = LoggerFactory.getLogger(UserExtraInfoServiceImpl.class);

    private final UserExtraInfoRepository userExtraInfoRepository;

    private final UserExtraInfoMapper userExtraInfoMapper;

    private final UserExtraInfoSearchRepository userExtraInfoSearchRepository;

    public UserExtraInfoServiceImpl(UserExtraInfoRepository userExtraInfoRepository, UserExtraInfoMapper userExtraInfoMapper, UserExtraInfoSearchRepository userExtraInfoSearchRepository) {
        this.userExtraInfoRepository = userExtraInfoRepository;
        this.userExtraInfoMapper = userExtraInfoMapper;
        this.userExtraInfoSearchRepository = userExtraInfoSearchRepository;
    }

    /**
     * Save a userExtraInfo.
     *
     * @param userExtraInfoDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserExtraInfoDTO save(UserExtraInfoDTO userExtraInfoDTO) {
        log.debug("Request to save UserExtraInfo : {}", userExtraInfoDTO);
        UserExtraInfo userExtraInfo = userExtraInfoMapper.toEntity(userExtraInfoDTO);
        userExtraInfo = userExtraInfoRepository.save(userExtraInfo);
        UserExtraInfoDTO result = userExtraInfoMapper.toDto(userExtraInfo);
        userExtraInfoSearchRepository.save(userExtraInfo);
        return result;
    }

    /**
     * Get all the userExtraInfos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserExtraInfoDTO> findAll() {
        log.debug("Request to get all UserExtraInfos");
        return userExtraInfoRepository.findAll().stream()
            .map(userExtraInfoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one userExtraInfo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserExtraInfoDTO> findOne(Long id) {
        log.debug("Request to get UserExtraInfo : {}", id);
        return userExtraInfoRepository.findById(id)
            .map(userExtraInfoMapper::toDto);
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
    public List<UserExtraInfoDTO> search(String query) {
        log.debug("Request to search UserExtraInfos for query {}", query);
        return StreamSupport
            .stream(userExtraInfoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(userExtraInfoMapper::toDto)
            .collect(Collectors.toList());
    }
}
