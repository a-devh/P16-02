package ksu.p1602.bricks.dto;

import java.time.OffsetDateTime;
import ksu.p1602.bricks.model.User;

public record UserDto(
        Long id,
        String name,
        String email,
        String username,
        String role,
        boolean locked,
        boolean deleted,
        OffsetDateTime createdAt,
        String createdBy,
        OffsetDateTime updatedAt,
        String updatedBy) {

    public static UserDto from(User user) {
        return new UserDto(
                user.getId(), user.getName(), user.getEmail(), user.getUsername(),
                user.getRole().name(), user.isLocked(), user.isDeleted(),
                user.getCreatedAt(), user.getCreatedBy(),
                user.getUpdatedAt(), user.getUpdatedBy());
    }
}