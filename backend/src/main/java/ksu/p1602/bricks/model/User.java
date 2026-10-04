package ksu.p1602.bricks.model;
 
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.generator.EventType;
import org.hibernate.type.SqlTypes;
@Entity 
@Table (name = "users")
@Getter @Setter 
public class User extends Base {
    public enum Role { Student, Staff, Admin }
    
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Generated(event = { EventType.INSERT, EventType.UPDATE })
    @Column(name = "username", insertable = false, updatable = false)
    @Setter(AccessLevel.NONE)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "password_attempts", nullable = false)
    private int passwordAttempts;

    @Column(name = "locked", nullable = false)
    private boolean locked;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "role", nullable = false, columnDefinition = "user_role")
    private Role role = Role.Student;
}
