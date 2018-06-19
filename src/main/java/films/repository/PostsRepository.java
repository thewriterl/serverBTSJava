package films.repository;

import films.domain.Posts;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Posts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostsRepository extends JpaRepository<Posts, Long> {

}
