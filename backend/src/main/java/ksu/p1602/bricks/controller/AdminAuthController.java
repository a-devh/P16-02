package ksu.p1602.bricks.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ksu.p1602.bricks.service.UserService;
import ksu.p1602.bricks.service.UserService.LoginResult;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

    public record LoginRequest(String username, String password) {}

    private final UserService userService;

    public AdminAuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req, HttpServletRequest request, HttpServletResponse response) {
        if (req.username() == null || req.password() == null
                || req.username().isBlank() || req.password().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Username and password are required"));
                    
        }

        LoginResult result = userService.adminLogin(req.username().trim(), req.password());

        return switch (result.status()) {
            case SUCCESS -> {
                var auth = new UsernamePasswordAuthenticationToken(
                        result.user().getUsername(), null,
                        List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
                SecurityContext ctx = SecurityContextHolder.createEmptyContext();
                ctx.setAuthentication(auth);
                SecurityContextHolder.setContext(ctx);
                new HttpSessionSecurityContextRepository().saveContext(ctx, request, response);

                yield ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "name", result.user().getName(),
                        "username", result.user().getUsername()));
            }
            case LOCKED -> ResponseEntity.status(HttpStatus.LOCKED)
                    .body(Map.of("error",
                            "Account locked after too many failed attempts. Contact a system administrator."));
            case INVALID_CREDENTIALS -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "error", "Invalid username or password",
                            "attemptsRemaining", result.attemptsRemaining()));
        };
    }
}