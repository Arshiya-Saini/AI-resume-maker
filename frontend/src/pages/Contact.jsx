import React from "react";

function Contact() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      <div className="max-w-md mx-auto">
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea className="textarea textarea-bordered" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
