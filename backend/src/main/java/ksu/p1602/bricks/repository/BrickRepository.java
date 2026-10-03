package ksu.p1602.bricks.repository;
import ksu.p1602.bricks.model.Brick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BrickRepository extends JpaRepository<Brick, Long>, JpaSpecificationExecutor<Brick> {
        List<Brick> findByDeletedFalse();

        @Query(value = 
            """
                select *
                from bricks
                where deleted = false
                and :q <% brick_search_text(name, inscription, campus, section, brick_number)
                order by :q <<-> brick_search_text(name, inscription, campus, section, brick_number)
            """, 
            nativeQuery = true) List<Brick> search(@Param("q") String q);
}
