package ksu.p1602.bricks.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import ksu.p1602.bricks.dto.PasswordChangeDto;
import ksu.p1602.bricks.dto.UserDto;
import ksu.p1602.bricks.dto.UserRequestDto;
import ksu.p1602.bricks.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/users")
public class UserController {
    private final UserService userService;

    // ?deleted=true is the manual toggle; without it only active users come back
    @GetMapping("/search")
    public Page<UserDto> search(
        @RequestParam(required = false) String q,
        @RequestParam(defaultValue = "false") boolean deleted,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "25") int size
    ) {
        return userService.searchUsers(q, deleted, PageRequest.of(page, Math.min(size, 50)))
            .map(UserDto::from);
    }

    @GetMapping("/{id}")
    public UserDto get(@PathVariable Long id,
                       @RequestParam(defaultValue = "false") boolean deleted) {
        return UserDto.from(userService.getUser(id, deleted));
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@Valid @RequestBody UserRequestDto request) {
        return UserDto.from(userService.createUser(request));
    }

    @PostMapping("/{id}/update")
    public UserDto update(@PathVariable Long id, @Valid @RequestBody UserRequestDto request) {
        return UserDto.from(userService.updateUser(id, request));
    }

    @PostMapping("/{id}/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/{id}/restore")
    public UserDto restore(@PathVariable Long id) {
        return UserDto.from(userService.restoreUser(id));
    }

    @PostMapping("/{id}/lock")
    public UserDto lock(@PathVariable Long id) {
        return UserDto.from(userService.lockUser(id));
    }

    @PostMapping("/{id}/unlock")
    public UserDto unlock(@PathVariable Long id) {
        return UserDto.from(userService.unlockUser(id));
    }

    // Body: { "newPassword": "..." }. currentPassword is ignored here.
    @PostMapping("/{id}/reset-password")
    public UserDto resetPassword(@PathVariable Long id, @Valid @RequestBody PasswordChangeDto request) {
        return UserDto.from(userService.resetPassword(id, request));
    }
}