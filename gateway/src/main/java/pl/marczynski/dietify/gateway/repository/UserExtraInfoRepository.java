package pl.marczynski.dietify.gateway.repository;

import pl.marczynski.dietify.gateway.domain.UserExtraInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserExtraInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtraInfoRepository extends JpaRepository<UserExtraInfo, Long> {

}
