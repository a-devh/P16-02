package ksu.p1602.bricks.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "bricks")
@Getter @Setter
public class Brick extends Base {
    public enum Campus { Kennesaw, Marietta }
    public enum Section { A, B, C, D, E, F, G, H, I, J, K, L }
    
    @Column(name = "name")
    private String name;

    @Column(name = "inscription")
    private String inscription;
    
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "campus", nullable = false, columnDefinition = "brick_campus")
    
    private Campus campus;
    
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "section", nullable = false, columnDefinition = "brick_section")
    private Section section;

    @Column(name = "brick_row")
    private Integer row;

    @Column(name = "brick_number")
    private Integer number;
}