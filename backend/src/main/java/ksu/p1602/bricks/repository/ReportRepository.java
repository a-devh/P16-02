package ksu.p1602.bricks.repository;

import ksu.p1602.bricks.model.Brick;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ReportRepository extends JpaRepository<Brick, Long>, JpaSpecificationExecutor<Brick> {

    // total bricks
    long countByDeletedFalse();

    // total bricks by kennesaw - marietta
    long countByCampusAndDeletedFalse(Brick.Campus campus);

    // potential duplicates
    @Query (value = 
        """
        SELECT b FROM Brick b
        WHERE b.deleted = false AND EXISTS (
            SELECT 1 FROM Brick o
            WHERE o.deleted = false AND o.id <> b.id
            AND lower(trim(o.name)) = lower(trim(b.name))
            AND lower(trim(coalesce(o.inscription, ''))) = lower(trim(coalesce(b.inscription, '')))
        )
        ORDER BY lower(trim(b.name)), b.campus, b.section, b.number
        """,
        countQuery = """
        SELECT count(b) FROM Brick b
        WHERE b.deleted = false AND EXISTS (
            SELECT 1 FROM Brick o
            WHERE o.deleted = false AND o.id <> b.id
            AND lower(trim(o.name)) = lower(trim(b.name))
            AND lower(trim(coalesce(o.inscription, ''))) = lower(trim(coalesce(b.inscription, '')))
        )
        """
    )
    Page<Brick> potentialDuplicateBricks(Pageable pageable);

    @Query("""
    SELECT count(b) FROM Brick b
    WHERE b.deleted = false AND EXISTS (
        SELECT 1 FROM Brick o
        WHERE o.deleted = false AND o.id <> b.id
        AND lower(trim(o.name)) = lower(trim(b.name))
        AND lower(trim(coalesce(o.inscription, ''))) = lower(trim(coalesce(b.inscription, '')))
    )
    """)
    long countPotentialDuplicates();

    // Removed Bricks
    long countByDeletedTrue();
    Page<Brick> findByDeletedTrue(Pageable pageable);

}
