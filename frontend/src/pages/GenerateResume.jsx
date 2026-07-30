import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane } from "react-icons/fa";
import { generateResume } from "../api/ResumeService";
import { BiBook } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import Resume from "../components/Resume";
import { useNavigate } from "react-router";

const GenerateResume = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login or sign up to access the AI Resume Maker.");
      navigate("/login");
    }
  }, [navigate]);
  const [data, setData] = useState({
    personalInformation: {
      fullName: "Durgesh Kumar Tiwari",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    interests: [],
  });

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: data,
  });

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({
    control,
    name: "certifications",
  });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });

  //handle form submit
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setData({ ...data });

    setShowFormUI(false);
    setShowPromptInput(false);
    setShowResumeUI(true);
  };

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobRole, setJobRole] = useState("Software Engineer");
const [experienceLevel, setExperienceLevel] = useState("Fresher");
const [resumeStyle, setResumeStyle] = useState("ATS Friendly");
const [resumeTemplate, setResumeTemplate] = useState("Professional");
const [resumeLength, setResumeLength] = useState("Auto");
const [fontStyle, setFontStyle] = useState("Inter");
const [accentColor, setAccentColor] = useState("Blue");
const [atsOptimization, setAtsOptimization] = useState(true);
const [aiEnhancement, setAiEnhancement] = useState(true);

  const getFallbackResume = (input) => ({
    personalInformation: {
      fullName: "AI Generated Resume",
      email: "example@example.com",
      phoneNumber: "+1 555 555 5555",
      location: "City, Country",
      linkedIn: "https://linkedin.com/in/username",
      gitHub: "https://github.com/username",
      portfolio: "https://portfolio.example.com",
    },
    summary: input
      ? `Generated resume based on: ${input}`
      : "Resume generated from your profile description.",
    skills: [
      { title: "Problem Solving", level: "Advanced" },
      { title: "JavaScript", level: "Advanced" },
      { title: "React", level: "Advanced" },
      { title: "Java", level: "Intermediate" },
    ],
    experience: [
      {
        jobTitle: "Software Engineering Intern",
        company: "Tech Startup",
        location: "Remote",
        duration: "Jun 2024 - Aug 2024",
        responsibility:
          "Developed user-facing features using React and collaborated with the backend team.",
      },
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        university: "Reputed University",
        location: "City, Country",
        graduationYear: "2025",
      },
    ],
    certifications: [
      {
        title: "Full Stack Web Development",
        issuingOrganization: "Online Academy",
        year: "2024",
      },
    ],
    projects: [
      {
        title: "AI Resume Builder",
        description:
          "Built an AI-powered resume builder with React frontend and Spring Boot backend.",
        technologiesUsed: "React, Spring Boot, TailwindCSS",
        githubLink: "https://github.com/username/ai-resume-maker",
      },
    ],
    languages: [{ name: "English" }],
    interests: [{ name: "Web Development" }],
  });

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a resume description before generating.");
      return;
    }

    try {
      setLoading(true);
      const finalPrompt = `
Desired Job Role:
${jobRole}

Experience Level:
${experienceLevel}

Resume Style:
${resumeStyle}

Candidate Information:
${description}
`;

const responseData = await generateResume(finalPrompt);
      console.log("Resume API response:", responseData);

      if (!responseData || !responseData.data) {
        throw new Error("Invalid response from server.");
      }

      setData(responseData.data);
      reset(responseData.data);

      toast.success("Resume Generated Successfully!", {
        duration: 3000,
        position: "top-center",
      });
      setShowFormUI(false);
      setShowPromptInput(false);
      setShowResumeUI(true);
      setDescription("");
    } catch (error) {
      console.error("Generate error:", error);

      const timedOut =
        error?.code === "ECONNABORTED" ||
        error?.message?.toLowerCase().includes("timeout");

      if (timedOut) {
        const fallbackData = getFallbackResume(description);
        setData(fallbackData);
        reset(fallbackData);
        toast.success(
          "Backend timeout occurred. Showing a generated demo resume instead.",
          {
            duration: 4000,
            position: "top-center",
          }
        );
        setShowFormUI(false);
        setShowPromptInput(false);
        setShowResumeUI(true);
      } else {
        const errorMessage =
          error?.response?.data?.message || error?.message ||
          "Unable to generate resume.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDescription("");
  };

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text text-slate-300 font-medium">{label}</span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none rounded-xl text-white transition-all"
      />
    </div>
  );
  const renderFieldArray = (fields, label, name, keys) => {
    return (
      <div className="form-control w-full mb-4">
        <h3 className="text-xl font-semibold">{label}</h3>
        {fields.fields.map((field, index) => (
          <div key={field.id} className="p-4 rounded-lg mb-4 bg-base-100">
            {keys.map((key) => (
              <div key={key}>
                {console.log(`${name}`)}
                {renderInput(`${name}.${index}.${key}`, key)}
              </div>
            ))}
            <button
              type="button"
              onClick={() => fields.remove(index)}
              className="btn btn-error btn-sm mt-2"
            >
              <FaTrash className="w-5 h-5 text-base-content" /> Remove {label}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            fields.append(
              keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
            )
          }
          className="btn btn-secondary btn-sm mt-2 flex items-center"
        >
          <FaPlusCircle className="w-5 h-5 mr-1 text-base-content" /> Add{" "}
          {label}
        </button>
      </div>
    );
  };

  function showFormFunction() {
    return (
      <div className="w-full p-10">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
          <BiBook className="text-blue-600" /> Resume Form
        </h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 space-y-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl text-slate-200 border border-blue-500/20 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("personalInformation.fullName", "Full Name")}
              {renderInput("personalInformation.email", "Email", "email")}
              {renderInput(
                "personalInformation.phoneNumber",
                "Phone Number",
                "tel"
              )}
              {renderInput("personalInformation.location", "Location")}
              {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
              {renderInput("personalInformation.gitHub", "GitHub", "url")}
              {renderInput("personalInformation.portfolio", "Portfolio", "url")}
            </div>

            <h3 className="text-xl font-semibold">Summary</h3>
            <textarea
              {...register("summary")}
              className="textarea textarea-bordered w-full bg-base-100 text-base-content"
              rows={4}
            ></textarea>

            {renderFieldArray(skillsFields, "Skills", "skills", [
              "title",
              "level",
            ])}
            {renderFieldArray(experienceFields, "Experience", "experience", [
              "jobTitle",
              "company",
              "location",
              "duration",
              "responsibility",
            ])}
            {renderFieldArray(educationFields, "Education", "education", [
              "degree",
              "university",
              "location",
              "graduationYear",
            ])}
            {renderFieldArray(
              certificationsFields,
              "Certifications",
              "certifications",
              ["title", "issuingOrganization", "year"]
            )}
            {renderFieldArray(projectsFields, "Projects", "projects", [
              "title",
              "description",
              "technologiesUsed",
              "githubLink",
            ])}

            <div className="flex gap-3 mt-16  p-4 rounded-xl ">
              <div className="flex-1">
                {renderFieldArray(languagesFields, "Languages", "languages", [
                  "name",
                ])}
              </div>
              <div className="flex-1">
                {renderFieldArray(interestsFields, "Interests", "interests", [
                  "name",
                ])}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  function ShowInputField() {
  const samplePrompt = `I am a Computer Science Engineering student skilled in Java, React, Spring Boot, MySQL and MongoDB. I have built full-stack web applications, AI-based projects, and participated in hackathons. I am looking for a Software Developer role.`;

  return (
    <div className="w-full max-w-5xl mx-auto">

      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl mb-5">
          <FaBrain className="text-white text-4xl" />
        </div>

        <h1 className="text-5xl font-bold text-white">
          AI Resume Builder
        </h1>

        <p className="mt-4 text-slate-400 text-lg max-w-3xl mx-auto">
          Generate an ATS-friendly, professional resume using Artificial
          Intelligence in less than a minute.
        </p>
      </div>

      {/* Main Card */}

      <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-700 shadow-2xl p-8">

        <div className="grid md:grid-cols-2 gap-6">

  {/* Resume Template */}

  <div>
    <label className="block text-white font-semibold mb-2">
      Resume Template
    </label>

    <select
      value={resumeTemplate}
      onChange={(e) => setResumeTemplate(e.target.value)}
      className="select select-bordered w-full bg-slate-800 text-white border-slate-700"
    >
      <option>Professional</option>
      <option>Modern</option>
      <option>Minimal</option>
      <option>Executive</option>
    </select>
  </div>

  {/* Job Role */}

  <div>
    <label className="block text-white font-semibold mb-2">
      Desired Job Role
    </label>

    <input
      type="text"
      value={jobRole}
      onChange={(e) => setJobRole(e.target.value)}
      className="input input-bordered w-full bg-slate-800 text-white border-slate-700"
      placeholder="Software Engineer"
    />
  </div>

  {/* Experience */}

  <div>
    <label className="block text-white font-semibold mb-2">
      Experience Level
    </label>

    <select
      value={experienceLevel}
      onChange={(e) => setExperienceLevel(e.target.value)}
      className="select select-bordered w-full bg-slate-800 text-white border-slate-700"
    >
      <option>Fresher</option>
      <option>0-1 Years</option>
      <option>1-3 Years</option>
      <option>3-5 Years</option>
      <option>5+ Years</option>
    </select>
  </div>

  {/* Resume Length */}

  <div>
    <label className="block text-white font-semibold mb-2">
      Resume Length
    </label>

    <select
      value={resumeLength}
      onChange={(e) => setResumeLength(e.target.value)}
      className="select select-bordered w-full bg-slate-800 text-white border-slate-700"
    >
      <option>Auto</option>
      <option>Force 1 Page</option>
      <option>Multi Page</option>
    </select>
  </div>

  {/* Resume Style */}

  <div>
    <label className="block text-white font-semibold mb-2">
      Resume Style
    </label>

    <select
      value={resumeStyle}
      onChange={(e) => setResumeStyle(e.target.value)}
      className="select select-bordered w-full bg-slate-800 text-white border-slate-700"
    >
      <option>ATS Friendly</option>
      <option>Professional</option>
      <option>Modern</option>
      <option>Minimal</option>
      <option>Creative</option>
    </select>
  </div>

  {/* Font */}

  <div>
    <label className="block text-white font-semibold mb-2">
      Font Style
    </label>

    <select
      value={fontStyle}
      onChange={(e) => setFontStyle(e.target.value)}
      className="select select-bordered w-full bg-slate-800 text-white border-slate-700"
    >
      <option>Inter</option>
      <option>Roboto</option>
      <option>Poppins</option>
      <option>Merriweather</option>
    </select>
  </div>

  {/* Accent Color */}

  <div className="md:col-span-2">
    <label className="block text-white font-semibold mb-3">
      Accent Color
    </label>

    <div className="flex gap-3">

      {["Blue", "Green", "Purple", "Black", "Red"].map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => setAccentColor(color)}
          className={`w-10 h-10 rounded-full border-4 transition ${
            accentColor === color
              ? "border-white scale-110"
              : "border-transparent"
          }`}
          style={{
            backgroundColor:
              color === "Blue"
                ? "#2563eb"
                : color === "Green"
                ? "#16a34a"
                : color === "Purple"
                ? "#9333ea"
                : color === "Black"
                ? "#111827"
                : "#dc2626"
          }}
        />
      ))}

    </div>
  </div>

  {/* AI Options */}

  <div className="md:col-span-2 flex flex-col md:flex-row gap-6">

    <label className="flex items-center gap-3 cursor-pointer">

      <input
        type="checkbox"
        checked={atsOptimization}
        onChange={(e) => setAtsOptimization(e.target.checked)}
        className="checkbox checkbox-primary"
      />

      <span className="text-white">
        ATS Optimization
      </span>

    </label>

    <label className="flex items-center gap-3 cursor-pointer">

      <input
        type="checkbox"
        checked={aiEnhancement}
        onChange={(e) => setAiEnhancement(e.target.checked)}
        className="checkbox checkbox-primary"
      />

      <span className="text-white">
        Improve Writing with AI
      </span>

    </label>

  </div>

</div>

       

        {/* Description */}

        <div className="mt-8">

          <div className="flex justify-between mb-2">

            <label className="text-white font-semibold">
              Tell AI about yourself
            </label>

            <span className="text-sm text-slate-400">
              {description.length}/2500
            </span>

          </div>

          <textarea
            disabled={loading}
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your education, skills, internships, projects, certifications, achievements, technologies, responsibilities, career goals..."
            className="textarea textarea-bordered w-full bg-slate-800 text-white border-slate-700 resize-none"
          />

        </div>

        {/* Sample Prompt */}

        <div className="mt-5">

          <button
            onClick={() => setDescription(samplePrompt)}
            className="btn btn-outline btn-info"
          >
            Use Sample Prompt
          </button>

        </div>

        {/* AI Tips */}

        <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">

          <h2 className="text-white font-bold text-xl mb-4">
            💡 AI Tips
          </h2>

          <ul className="space-y-2 text-slate-300">

            <li>✔ Mention your projects.</li>

            <li>✔ Mention internships.</li>

            <li>✔ Include certifications.</li>

            <li>✔ Mention technical skills.</li>

            <li>✔ Mention achievements.</li>

            <li>✔ Include leadership or hackathons.</li>

          </ul>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-wrap justify-center gap-5">

          <button
            disabled={loading}
            onClick={handleGenerate}
            className="btn btn-primary btn-lg px-10"
          >
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}

            <FaPaperPlane />

            Generate Resume

          </button>

          <button
            onClick={handleClear}
            className="btn btn-outline btn-error btn-lg px-10"
          >
            <FaTrash />

            Clear

          </button>

        </div>

      </div>

    </div>
  );
}
  function showResume() {
    return (
      <div>
        <Resume data={data} />

        <div className="flex mt-5 justify-center gap-2">
          <div
            onClick={() => {
              setShowPromptInput(true);
              setShowFormUI(false);
              setShowResumeUI(false);
            }}
            className="btn bg-gradient-to-r from-purple-500 to-pink-600 text-white border-none hover:from-purple-600 hover:to-pink-700 transition-all"
          >
            Generate Another
          </div>
          <div
            onClick={() => {
              setShowPromptInput(false);
              setShowFormUI(true);
              setShowResumeUI(false);
            }}
            className="btn bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Edit
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 p-10 flex flex-col gap-3 items-center justify-center font-sans">
      {showFormUI && showFormFunction()}
      {showPromptInput && ShowInputField()}
      {showResumeUI && showResume()}
      {!showFormUI && !showPromptInput && !showResumeUI && (
        <div className="text-center py-8 text-gray-500">
          <p>No content to display. Click "Get Started" to begin.</p>
        </div>
      )}
    </div>
  );
};

export default GenerateResume;
