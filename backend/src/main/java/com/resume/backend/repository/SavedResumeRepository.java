package com.resume.backend.repository;

import com.resume.backend.entity.SavedResume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedResumeRepository extends JpaRepository<SavedResume, Long> {
    List<SavedResume> findByUserIdOrderByCreatedAtDesc(Long userId);
}
