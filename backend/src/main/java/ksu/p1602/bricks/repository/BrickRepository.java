package ksu.p1602.bricks.repository;
import ksu.p1602.bricks.model.Brick;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface BrickRepository extends JpaRepository<Brick, Long>, JpaSpecificationExecutor<Brick> {
    @Query(value =
        """
        SELECT * FROM bricks
        WHERE (CAST(:deleted AS boolean) IS NULL OR deleted = CAST(:deleted AS boolean))
        AND (CAST(:campus AS text) IS NULL OR campus = CAST(:campus AS brick_campus))
        AND (CAST(:section AS text) IS NULL OR section = CAST(:section AS brick_section))
        AND (CAST(:q AS text) IS NULL
                OR :q <% brick_search_text(name, inscription, campus, section, brick_number))
        ORDER BY
            CASE WHEN CAST(:q AS text) IS NULL THEN 0
                    ELSE :q <<-> brick_search_text(name, inscription, campus, section, brick_number)
            END,
            campus, section, brick_number
        """,
    countQuery =
        """
        SELECT count(*) FROM bricks
        WHERE (CAST(:deleted AS boolean) IS NULL OR deleted = CAST(:deleted AS boolean))
        AND (CAST(:campus AS text) IS NULL OR campus = CAST(:campus AS brick_campus))
        AND (CAST(:section AS text) IS NULL OR section = CAST(:section AS brick_section))
        AND (CAST(:q AS text) IS NULL
                OR :q <% brick_search_text(name, inscription, campus, section, brick_number))
        """,
    nativeQuery = true)
    Page<Brick> searchPage(
        @Param("q") String q,
        @Param("campus") String campus,
        @Param("section") String section,
        @Param("deleted") Boolean deleted,
        Pageable pageable);
    

    //getAll (deleted and non-deleted)
    List<Brick> findByDeleted(boolean deleted);

    //getAll by campus (deleted and non-deleted)
    List<Brick> findByCampusAndDeleted(Brick.Campus campus, boolean deleted);
    
    //get by id (deleted and non-deleted)
    Optional<Brick> findByIdAndDeleted(Long id, boolean deleted);

    //collision checkers
    boolean existsByCampusAndSectionAndNumberAndDeletedFalse(
        Brick.Campus campus, Brick.Section section, Integer number);

    boolean existsByCampusAndSectionAndNumberAndDeletedFalseAndIdNot(
        Brick.Campus campus, Brick.Section section, Integer number, Long id);
}