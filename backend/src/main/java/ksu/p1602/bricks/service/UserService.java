package ksu.p1602.bricks.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import ksu.p1602.bricks.dto.PasswordChangeDto;
import ksu.p1602.bricks.dto.UserRequestDto;
import ksu.p1602.bricks.model.User;
import ksu.p1602.bricks.repository.UserRepository;

@Service
public class UserService {

    public static final int MAX_FAILED_ATTEMPTS = 5;
    public static final int MIN_PASSWORD_LENGTH = 8;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(noRollbackFor = ResponseStatusException.class)
    public User login(String usernameOrEmail, String rawPassword) {
        Optional<User> found = usernameOrEmail.contains("@")
                ? userRepository.findByEmailIgnoreCaseAndDeletedFalse(usernameOrEmail)
                : userRepository.findByUsernameAndDeletedFalse(usernameOrEmail.toLowerCase());

        if (found.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        User user = found.get();

        if (user.isLocked()) {
            throw new ResponseStatusException(HttpStatus.LOCKED,
                    "Account locked after too many failed attempts. Contact a system administrator.");
        }

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            int attempts = user.getPasswordAttempts() + 1;
            user.setPasswordAttempts(attempts);

            if (attempts >= MAX_FAILED_ATTEMPTS) {
                user.setLocked(true);
                userRepository.save(user);
                throw new ResponseStatusException(HttpStatus.LOCKED,
                        "Account locked after too many failed attempts. Contact a system administrator.");
            }

            userRepository.save(user);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Invalid username or password. " + (MAX_FAILED_ATTEMPTS - attempts) + " attempts remaining.");
        }

        user.setPasswordAttempts(0);
        return userRepository.save(user);
    }

    public Page<User> searchUsers(String q, boolean deleted, Pageable pageable) {
        String search = (q == null || q.isBlank()) ? null : q.trim();
        return userRepository.searchPage(search, deleted, pageable);
    }

    public User getUser(Long id, boolean deleted) {
        return userRepository.findByIdAndDeleted(id, deleted)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User createUser(UserRequestDto dto) {
        checkPassword(dto.password());
        checkEmailAvailable(dto.email(), null);

        User user = new User();
        user.setName(dto.name().trim());
        user.setEmail(dto.email().trim());
        user.setRole(dto.role());
        user.setPasswordHash(passwordEncoder.encode(dto.password()));
        user.setPasswordResetRequired(true);
        return userRepository.save(user);
    }

    public User updateUser(Long id, UserRequestDto dto) {
        User user = getActiveUser(id);
        checkEmailAvailable(dto.email(), id);

        user.setName(dto.name().trim());
        user.setEmail(dto.email().trim());
        user.setRole(dto.role());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = getActiveUser(id);
        user.setDeleted(true);
        userRepository.save(user);
    }

    public User lockUser(Long id) {
        User user = getActiveUser(id);
        user.setLocked(true);
        return userRepository.save(user);
    }

    public User unlockUser(Long id) {
        User user = getActiveUser(id);
        user.setLocked(false);
        user.setPasswordAttempts(0);
        return userRepository.save(user);
    }

    public User resetPassword(Long id, PasswordChangeDto dto) {
        checkPassword(dto.newPassword());

        User user = getActiveUser(id);
        user.setPasswordHash(passwordEncoder.encode(dto.newPassword()));
        user.setPasswordAttempts(0);
        user.setPasswordResetRequired(true);
        return userRepository.save(user);
    }

    public User changeOwnPassword(String username, PasswordChangeDto dto) {
        User user = userRepository.findByUsernameAndDeletedFalse(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (dto.currentPassword() == null
                || !passwordEncoder.matches(dto.currentPassword(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Current password is incorrect");
        }
        checkPassword(dto.newPassword());
        if (dto.newPassword().equals(dto.currentPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "New password must be different from the current one");
        }

        user.setPasswordHash(passwordEncoder.encode(dto.newPassword()));
        user.setPasswordResetRequired(false);
        return userRepository.save(user);
    }

    public User restoreUser(Long id) {
    User user = userRepository.findByIdAndDeleted(id, true)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Deleted user not found"));
    checkEmailAvailable(user.getEmail(), id);

    user.setDeleted(false);
    return userRepository.save(user);
}

    private User getActiveUser(Long id) {
        return userRepository.findByIdAndDeleted(id, false)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private void checkPassword(String password) {
        if (password == null || password.length() < MIN_PASSWORD_LENGTH) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password must be at least " + MIN_PASSWORD_LENGTH + " characters");
        }
    }

    private void checkEmailAvailable(String email, Long currentUserId) {
        String trimmed = email.trim();
        String username = trimmed.substring(0, trimmed.indexOf('@')).toLowerCase();

        Optional<User> sameEmail = userRepository.findByEmailIgnoreCaseAndDeletedFalse(trimmed);
        if (sameEmail.isPresent() && !sameEmail.get().getId().equals(currentUserId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use");
        }

        Optional<User> sameUsername = userRepository.findByUsernameAndDeletedFalse(username);
        if (sameUsername.isPresent() && !sameUsername.get().getId().equals(currentUserId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Username \"" + username + "\" is already taken by another email");
        }
    }
}