package com.resume.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

@Service
public class ResumeServiceImpl implements ResumeService {

    private ChatClient chatClient;

    public ResumeServiceImpl(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {

        String promptString = this.loadPromptFromFile("resume_prompt.txt");
        String promptContent = this.putValuesToTemplate(promptString, Map.of(
                "userDescription", userResumeDescription
        ));
        Prompt prompt = new Prompt(promptContent);

        String response;
        try {
            response = chatClient.prompt(prompt).call().content();
        } catch (Exception ex) {
            System.err.println("Ollama request failed, using fallback resume response: " + ex.getMessage());
            response = getFallbackResponse(userResumeDescription);
        }

        Map<String, Object> stringObjectMap = parseMultipleResponses(response);
        return stringObjectMap;
    }


    String loadPromptFromFile(String filename) throws IOException {
        Path path = new ClassPathResource(filename).getFile().toPath();
        return Files.readString(path);
    }

    String putValuesToTemplate(String template, Map<String, String> values) {
        for (Map.Entry<String, String> entry : values.entrySet()) {

            template = template.replace("{{" + entry.getKey() + "}}", entry.getValue());

        }
        return template;
    }


    public static Map<String, Object> parseMultipleResponses(String response) {
        Map<String, Object> jsonResponse = new HashMap<>();

        // Extract content inside <think> tags
        int thinkStart = response.indexOf("<think>") + 7;
        int thinkEnd = response.indexOf("</think>");
        if (thinkStart != -1 && thinkEnd != -1) {
            String thinkContent = response.substring(thinkStart, thinkEnd).trim();
            jsonResponse.put("think", thinkContent);
        } else {
            jsonResponse.put("think", null); // Handle missing <think> tags
        }

        // Extract content that is in JSON format
        int jsonStart = response.indexOf("```json") + 7; // Start after ```json
        int jsonEnd = response.lastIndexOf("```");       // End before ```
        if (jsonStart != -1 && jsonEnd != -1 && jsonStart < jsonEnd) {
            String jsonContent = response.substring(jsonStart, jsonEnd).trim();
            try {
                // Convert JSON string to Map using Jackson ObjectMapper
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> dataContent = objectMapper.readValue(jsonContent, Map.class);
                jsonResponse.put("data", dataContent);
            } catch (Exception e) {
                jsonResponse.put("data", null); // Handle invalid JSON
                System.err.println("Invalid JSON format in the response: " + e.getMessage());
            }
        } else {
            jsonResponse.put("data", null); // Handle missing JSON
        }

        return jsonResponse;
    }

    private String getFallbackResponse(String userDescription) {
        String json = """
{
  "personalInformation": {
    "fullName": "AI Generated Resume",
    "email": "your.email@example.com",
    "phoneNumber": "+1 555 123 4567",
    "location": "City, Country",
    "linkedIn": "https://www.linkedin.com/in/yourprofile",
    "gitHub": "https://github.com/yourprofile",
    "portfolio": "https://yourportfolio.com"
  },
  "summary": "Generated resume based on: %s",
  "skills": [
    {"title": "Communication", "level": "Advanced"},
    {"title": "Teamwork", "level": "Advanced"},
    {"title": "Problem Solving", "level": "Advanced"}
  ],
  "experience": [
    {
      "jobTitle": "Software Developer",
      "company": "Tech Company",
      "location": "Remote",
      "duration": "2024 - Present",
      "responsibility": "Developed modern web applications and collaborated with cross-functional teams."
    }
  ],
  "education": [
    {
      "degree": "B.Sc. in Computer Science",
      "university": "University Name",
      "location": "City, Country",
      "graduationYear": "2024"
    }
  ],
  "certifications": [
    {
      "title": "AI Resume Generator Training",
      "issuingOrganization": "AI Resume Maker",
      "year": "2026"
    }
  ],
  "projects": [
    {
      "title": "Resume Builder",
      "description": "A resume builder using AI and modern web technologies.",
      "technologiesUsed": "React, Spring Boot",
      "githubLink": "https://github.com/yourprofile/resume-builder"
    }
  ],
  "languages": [
    {"name": "English"}
  ],
  "interests": [
    {"name": "Web Development"}
  ]
}
""";
        json = String.format(json, userDescription.replace("\"", "\\\""));
        return "<think>Fallback response used because the AI model is unavailable.</think>\n```json\n" + json + "\n```";
    }
}


