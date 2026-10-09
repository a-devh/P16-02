package ksu.p1602.bricks.repository;

import ksu.p1602.bricks.model.User;
import ksu.p1602.bricks.dto.PasswordChangeDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //search by username, name, email
    @Query(value =
        """
        SELECT * FROM users
        WHERE (CAST(:deleted AS boolean) IS NULL OR deleted = CAST(:deleted AS boolean))
        AND (CAST(:q AS text) IS NULL
                OR :q <% user_search_text(name, username, email))
        ORDER BY
            CASE WHEN CAST(:q AS text) IS NULL THEN 0
                    ELSE :q <<-> user_search_text(name, username, email)
            END,
            name
        """,
    countQuery =
        """
        SELECT count(*) FROM users
        WHERE (CAST(:deleted AS boolean) IS NULL OR deleted = CAST(:deleted AS boolean))
        AND (CAST(:q AS text) IS NULL
                OR :q <% user_search_text(name, username, email))
        """,
    nativeQuery = true)
    Page<User> searchPage(
        @Param("q") String q,
        @Param("deleted") Boolean deleted,
        Pageable pageable);
    
    
    //getall (del and non-del)
    Page<User> findByDeleted(boolean deleted, Pageable pageable);
    
    //get (del and non-del)
    Optional<User> findByIdAndDeleted(Long id, boolean deleted);
    
    //checkers for username/email conflicts
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    //login checkers
    Optional<User> findByUsernameAndDeletedFalse(String username);
    Optional<User> findByEmailAndDeletedFalse(String email);

    //change user password
    @Query("UPDATE User u SET u.passwordHash = :#{#dto.newPasswordHash} WHERE u.id = :#{#dto.userId}")
    void changePassword(@Param("dto") PasswordChangeDto dto);


    Optional<User> findByEmailIgnoreCaseAndDeletedFalse(String usernameOrEmail);

    //update included with JpaRepository under save()
    
}