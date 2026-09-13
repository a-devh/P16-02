package ksu.p1602.bricks.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "bricks")
public class Brick {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private String campus;

    @Column(nullable = false)
    private String section;

    @Column(name = "bricknumber", nullable = false)
    private Integer brickNumber;

    @Column(name = "createdat")
    private Timestamp createdAt;

    @Column(name = "createdby", nullable = false)
    private String createdBy;

    @Column(name = "updatedat")
    private Timestamp updatedAt;

    @Column(name = "updatedby", nullable = false)
    private String updatedBy;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCampus() { return campus; }
    public void setCampus(String campus) { this.campus = campus; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public Integer getBrickNumber() { return brickNumber; }
    public void setBrickNumber(Integer brickNumber) { this.brickNumber = brickNumber; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }
}