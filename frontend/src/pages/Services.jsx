import React from "react";

function Services() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">AI Resume Generation</h2>
            <p>Generate professional resumes using advanced AI technology based on your description.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Resume Editing</h2>
            <p>Edit and customize your generated resume with our user-friendly form interface.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Multiple Formats</h2>
            <p>Export your resume in various formats including PDF for easy sharing and printing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
