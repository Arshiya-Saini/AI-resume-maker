package com.resume.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    public record SignUpRequest(
            @NotBlank String fullName,
            @Email @NotBlank String email,
            @Size(min = 6, message = "Password must be at least 6 characters") String password
    ) {}

    public record LoginRequest(
            @Email @NotBlank String email,
            @NotBlank String password
    ) {}

    public record UserResponse(
            Long id,
            String fullName,
            String email
    ) {}

    public record SaveResumeRequest(
            Long userId,
            String userDescription,
            String resumeJson
    ) {}
}
