package ksu.p1602.bricks.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ksu.p1602.bricks.model.User;
import ksu.p1602.bricks.repository.UserRepository;

@Service
public class UserService {

    public static final int MAX_FAILED_ATTEMPTS = 5;

    public enum Status { SUCCESS, INVALID_CREDENTIALS, LOCKED }

    public record LoginResult(Status status, int attemptsRemaining, User user) {}

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public LoginResult adminLogin(String username, String rawPassword) {
        
        Optional<User> opt = userRepository.findByUsernameAndDeletedFalse(username);

        if (opt.isEmpty() || opt.get().getRole() != User.Role.Admin) {
            return new LoginResult(Status.INVALID_CREDENTIALS, 0, null);
        }

        User user = opt.get();

        if (user.isLocked()) {
            return new LoginResult(Status.LOCKED, 0, null);
        }

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            int attempts = user.getPasswordAttempts() + 1;
            user.setPasswordAttempts(attempts);

            if (attempts >= MAX_FAILED_ATTEMPTS) {
                user.setLocked(true);
                userRepository.save(user);
                return new LoginResult(Status.LOCKED, 0, null);
            }
            userRepository.save(user);
            return new LoginResult(Status.INVALID_CREDENTIALS, MAX_FAILED_ATTEMPTS - attempts, null);
        }

        user.setPasswordAttempts(0);
        userRepository.save(user);
        return new LoginResult(Status.SUCCESS, MAX_FAILED_ATTEMPTS, user);
    }
}