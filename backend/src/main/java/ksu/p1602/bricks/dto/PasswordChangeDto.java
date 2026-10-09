package ksu.p1602.bricks.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordChangeDto(
        String currentPassword,
        @NotBlank @Size(min = 8) String newPassword) {}