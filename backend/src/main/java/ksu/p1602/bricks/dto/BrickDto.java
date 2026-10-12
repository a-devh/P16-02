package ksu.p1602.bricks.dto;

import ksu.p1602.bricks.model.Brick;

public record BrickDto(
    Long id,
    String name,
    String inscription,
    Brick.Campus campus,
    Brick.Section section,
    Integer number
) {
    public static BrickDto fromEntity(Brick brick) {
        return new BrickDto(
            brick.getId(),
            brick.getName(),
            brick.getInscription(),
            brick.getCampus(),
            brick.getSection(),
            brick.getNumber()
        );
    }
}

