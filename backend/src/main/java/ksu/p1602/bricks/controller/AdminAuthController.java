package ksu.p1602.bricks.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import ksu.p1602.bricks.dto.PasswordChangeDto;
import ksu.p1602.bricks.dto.UserDto;
import ksu.p1602.bricks.model.User;
import ksu.p1602.bricks.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AdminAuthController {

    public record LoginRequest(String username, String password) {}

    public record LoginResponse(
            String token,
            String username,
            String name,
            String role,
            boolean passwordResetRequired) {}

    private final UserService userService;
    private final JwtEncoder jwtEncoder;

    @Value("${jwt.expiration-minutes}")
    private long expirationMinutes;

    public AdminAuthController(UserService userService, JwtEncoder jwtEncoder) {
        this.userService = userService;
        this.jwtEncoder = jwtEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req.username() == null || req.password() == null
                || req.username().isBlank() || req.password().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Username and password are required"));
        }

        try {
            User user = userService.login(req.username().trim(), req.password());
            String token = createToken(user);
            return ResponseEntity.ok(new LoginResponse(
                    token,
                    user.getUsername(),
                    user.getName(),
                    user.getRole().name(),
                    user.isPasswordResetRequired()));   // NEW
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(Map.of("error", e.getReason()));
        }
    }

    @PostMapping("/password")
    public UserDto changePassword(@Valid @RequestBody PasswordChangeDto request, Authentication auth) {
        return UserDto.from(userService.changeOwnPassword(auth.getName(), request));
    }

    private String createToken(User user) {
        String role = user.isPasswordResetRequired() ? "PasswordReset" : user.getRole().name();

        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("bricks")
                .issuedAt(now)
                .expiresAt(now.plus(expirationMinutes, ChronoUnit.MINUTES))
                .subject(user.getUsername())
                .claim("role", role)                    
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}