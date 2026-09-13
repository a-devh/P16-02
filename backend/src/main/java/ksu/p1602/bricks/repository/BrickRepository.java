package ksu.p1602.bricks.repository;
import ksu.p1602.bricks.model.Brick;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrickRepository extends JpaRepository<Brick, Long> {
    
}
