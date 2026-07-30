import React from "react";
import "daisyui/dist/full.css";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);

  if (!data || !data.personalInformation) {
    return <div className="text-center py-8 text-gray-500">No resume data available</div>;
  }

  const handleDownloadPdf = () => {
    toPng(resumeRef.current, { quality: 1.0 })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(dataUrl, "PNG", 10, 10, 190, 0);
        pdf.save(`${data.personalInformation.fullName || "resume"}.pdf`);
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
      });
  };
  return (
    <>
      <div
        ref={resumeRef}
        className="max-w-4xl mx-auto shadow-2xl rounded-xl p-8 space-y-6 bg-white text-gray-800 border border-blue-100 transition-all duration-300"
      >
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
            {data.personalInformation.fullName}
          </h1>
          <p className="text-lg text-gray-500">
            {data.personalInformation.location}
          </p>

          <div className="flex justify-center space-x-4 mt-2">
            {data.personalInformation.email && (
              <a
                href={`mailto:${data.personalInformation.email}`}
                className="flex items-center text-secondary hover:underline"
              >
                <FaEnvelope className="mr-2" /> {data.personalInformation.email}
              </a>
            )}
            {data.personalInformation.phoneNumber && (
              <p className="flex items-center text-gray-500">
                <FaPhone className="mr-2" />{" "}
                {data.personalInformation.phoneNumber}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-4 mt-2">
            {data.personalInformation.gitHub && (
              <a
                href={data.personalInformation.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 flex items-center"
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
            )}
            {data.personalInformation.linkedIn && (
              <a
                href={data.personalInformation.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <FaLinkedin className="mr-2" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="divider"></div>

        {/* Summary Section */}
        {data.summary && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-600">Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        <div className="divider"></div>

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-600">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="text-gray-700"
                >
                  • {skill.title}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="divider"></div>

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-600">Experience</h2>
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="mb-5 border-l-4 border-blue-600 pl-5"
              >
                <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                <p className="text-gray-600 font-medium">
                  {exp.company} | {exp.location}
                </p>
                <p className="text-gray-500 text-sm">{exp.duration}</p>
                <p className="mt-2 text-gray-700">
                  {exp.responsibility}
                </p>
              </div>
            ))}
          </section>
        )}

        <div className="divider"></div>

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-600">Education</h2>
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="mb-5 border-l-4 border-blue-600 pl-5"
              >
                <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600 font-medium">
                  {edu.university}, {edu.location}
                </p>
                <p className="text-gray-600 text-sm">
                  🎓 Graduation Year: {edu.graduationYear}
                </p>
              </div>
            ))}
          </section>
        )}

        <div className="divider"></div>

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-600">
              Certifications
            </h2>
            {data.certifications.map((cert, index) => (
              <div
                key={index}
                className="mb-5 border-l-4 border-blue-600 pl-5"
              >
                <h3 className="text-xl font-bold text-gray-800">{cert.title}</h3>
                <p className="text-gray-600">
                  {cert.issuingOrganization} - {cert.year}
                </p>
              </div>
            ))}
          </section>
        )}

        <div className="divider"></div>

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-600">Projects</h2>
            {data.projects.map((proj, index) => (
              <div
                key={index}
                className="mb-5 border-l-4 border-blue-600 pl-5"
              >
                <h3 className="text-xl font-bold text-gray-800">{proj.title}</h3>
                <p className="text-gray-700 mt-1">
                  {proj.description}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  🛠 Technologies: {Array.isArray(proj.technologiesUsed) ? proj.technologiesUsed.join(", ") : proj.technologiesUsed}
                </p>
                {proj.githubLink && (
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2 inline-block"
                  >
                    🔗 GitHub Link
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="divider"></div>

        {/* Achievements Section */}
        {data.achievements && data.achievements.length > 0 && (
          <>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">
                Achievements
              </h2>
              {data.achievements.map((ach, index) => (
                <div
                  key={index}
                  className="mb-5 border-l-4 border-blue-600 pl-5"
                >
                  <h3 className="text-xl font-bold text-gray-800">{ach.title}</h3>
                  <p className="text-gray-600">{ach.year}</p>
                  <p className="text-gray-700">
                    {ach.extraInformation}
                  </p>
                </div>
              ))}
            </section>
            <div className="divider"></div>
          </>
        )}

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <>
            <section>
              <h2 className="text-2xl font-semibold text-blue-600">Languages</h2>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                {data.languages.map((lang, index) => (
                  <li key={index}>{lang.name}</li>
                ))}
              </ul>
            </section>
            <div className="divider"></div>
          </>
        )}

        {/* Interests Section */}
        {data.interests && data.interests.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-blue-600">Interests</h2>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              {data.interests.map((interest, index) => (
                <li key={index}>{interest.name}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <section className="flex justify-center mt-8 pb-8">
        <button onClick={handleDownloadPdf} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
          📥 Download Resume as PDF
        </button>
      </section>
    </>
  );
};

export default Resume;
