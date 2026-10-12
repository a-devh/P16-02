package ksu.p1602.bricks.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import ksu.p1602.bricks.model.User;

public record UserRequestDto(
        @NotBlank String name,
        @NotBlank @Email String email,
        String password,
        @NotNull User.Role role) {}