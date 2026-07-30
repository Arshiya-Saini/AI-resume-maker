package com.resume.backend.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "saved_resume")
public class SavedResume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String userDescription;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String resumeJson;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public SavedResume() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getUserDescription() { return userDescription; }
    public void setUserDescription(String userDescription) { this.userDescription = userDescription; }

    public String getResumeJson() { return resumeJson; }
    public void setResumeJson(String resumeJson) { this.resumeJson = resumeJson; }

    public Instant getCreatedAt() { return createdAt; }
}
