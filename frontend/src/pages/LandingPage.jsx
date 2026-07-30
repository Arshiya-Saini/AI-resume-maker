import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-[#030712] min-h-screen text-slate-200 selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center space-y-10 max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-fade-in mx-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Powered by Advanced AI
              </div>
              <h1 className="text-5xl lg:text-8xl font-bold tracking-tight leading-tight">
                Craft Your <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Future</span> <br /> with Precision AI
              </h1>
              <p className="text-lg lg:text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Transform your career journey with professional, ATS-optimized resumes generated in seconds. Describe your experience, and let our intelligence do the heavy lifting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {user ? (
                  <Link to={"/generate-resume"} className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </Link>
                ) : (
                  <Link to={"/signup"} className="group relative px-10 py-5 bg-white text-slate-900 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 overflow-hidden shadow-xl">
                    Join for Free
                  </Link>
                )}
                <a href="#features" className="px-10 py-5 text-slate-400 hover:text-white transition-colors font-semibold text-lg border border-slate-800 rounded-2xl hover:bg-slate-800/50">
                  See how it works
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Divider Line */}
      <div className="container mx-auto px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-32 relative bg-[#05091a] border-t border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-6xl font-bold">Why AI Resume Maker?</h2>
            <p className="text-slate-400 lg:text-xl">Industry-standard precision coupled with the latest in generative intelligence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-xl font-bold mb-4">AI-Driven Optimization</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Our neural engines analyze industry trends and keywords to ensure your resume stands out to both humans and ATS.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📄</div>
              <h3 className="text-xl font-bold mb-4">Elite Templates</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Meticulously designed templates used by successful hires at Fortune 500 companies like Google, Meta, and Netflix.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">💼</div>
              <h3 className="text-xl font-bold mb-4">Career Acceleration</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Get job-ready in minutes instead of days. Speed up your application process and land interviews faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-800 bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50k+</div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-widest">Resumes Created</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">94%</div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-widest">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-widest">ATS Templates</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-widest">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 -z-10"></div>
        <div className="container mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
            The Next Step in Your Career <br /> <span className="text-blue-400">Starts Here</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 lg:text-lg">
            Join thousands of professionals who have elevated their careers using our AI-powered tool.
          </p>
          <div className="pt-4">
            {user ? (
              <Link to={"/generate-resume"} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-blue-900/30">
                Start Building for Free
              </Link>
            ) : (
              <Link to={"/signup"} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-blue-900/30">
                Create Your Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
