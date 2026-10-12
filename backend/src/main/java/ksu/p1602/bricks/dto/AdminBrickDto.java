package ksu.p1602.bricks.dto;

import java.sql.Timestamp;
import ksu.p1602.bricks.model.Brick;

public record AdminBrickDto(
    Long id,
    String name,
    String inscription,
    Brick.Campus campus,
    Brick.Section section,
    Integer number,
    boolean deleted,
    Timestamp createdAt,
    Timestamp updatedAt,
    String createdBy,
    String updatedBy
) {
    public static AdminBrickDto fromEntity(Brick brick) {
        return new AdminBrickDto(
            brick.getId(),
            brick.getName(),
            brick.getInscription(),
            brick.getCampus(),
            brick.getSection(),
            brick.getNumber(),
            brick.isDeleted(),
            Timestamp.from(brick.getCreatedAt().toInstant()),
            Timestamp.from(brick.getUpdatedAt().toInstant()),
            brick.getCreatedBy(),
            brick.getUpdatedBy()
        );
    }
}
