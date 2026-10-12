package ksu.p1602.bricks.dto;
import java.util.Map;

public record RowCheckDto (
    Integer index,
    Boolean valid,
    Map<String, String> errors
) {
    
}
