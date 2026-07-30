package com.resume.backend.controller;

import com.resume.backend.dto.AuthDtos.*;
import com.resume.backend.entity.User;
import com.resume.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "An account with this email already exists"));
        }

        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new UserResponse(user.getId(), user.getFullName(), user.getEmail()));
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {

    var user = userRepository.findByEmail(request.email());

    if (user.isEmpty() ||
            !passwordEncoder.matches(request.password(), user.get().getPasswordHash())) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid email or password"));
    }

    User u = user.get();

    return ResponseEntity.ok(
            new UserResponse(
                    u.getId(),
                    u.getFullName(),
                    u.getEmail()
            )
    );
}
}
