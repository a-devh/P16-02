package ksu.p1602.bricks.dto;

import ksu.p1602.bricks.model.Brick;

public record PositionKeyDto(
    Brick.Campus campus,
    Brick.Section section,
    Integer number
) {
    
}
