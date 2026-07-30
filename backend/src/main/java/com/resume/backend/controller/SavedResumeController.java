package com.resume.backend.controller;

import com.resume.backend.dto.AuthDtos.SaveResumeRequest;
import com.resume.backend.entity.SavedResume;
import com.resume.backend.entity.User;
import com.resume.backend.repository.SavedResumeRepository;
import com.resume.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/resumes")
public class SavedResumeController {

    private final SavedResumeRepository savedResumeRepository;
    private final UserRepository userRepository;

    public SavedResumeController(SavedResumeRepository savedResumeRepository, UserRepository userRepository) {
        this.savedResumeRepository = savedResumeRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> saveResume(@RequestBody SaveResumeRequest request) {
        User user = userRepository.findById(request.userId())
                .orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        }

        SavedResume resume = new SavedResume();
        resume.setUser(user);
        resume.setUserDescription(request.userDescription());
        resume.setResumeJson(request.resumeJson());
        savedResumeRepository.save(resume);

        return ResponseEntity.status(HttpStatus.CREATED).body(resume);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SavedResume>> getResumesForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(savedResumeRepository.findByUserIdOrderByCreatedAtDesc(userId));
    }
}
