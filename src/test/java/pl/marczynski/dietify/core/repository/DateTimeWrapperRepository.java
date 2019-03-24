package pl.marczynski.dietify.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.marczynski.dietify.core.domain.DateTimeWrapper;

/**
 * Spring Data JPA repository for the DateTimeWrapper entity.
 */
@Repository
public interface DateTimeWrapperRepository extends JpaRepository<DateTimeWrapper, Long> {

}
