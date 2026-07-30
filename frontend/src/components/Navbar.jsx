import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]); // Re-check on every navigation

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="navbar bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-lg sticky top-0 z-50 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl text-white border border-blue-800"
          >
            <li><Link to={"/about"} className="hover:bg-blue-600">About</Link></li>
            <li><Link to={"/services"} className="hover:bg-blue-600">Services</Link></li>
            <li><Link to={"/contact"} className="hover:bg-blue-600">Contact Us</Link></li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          🚀 AI Resume Maker
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link to={"/about"} className="rounded-lg hover:bg-blue-600 transition">About</Link></li>
          <li><Link to={"/services"} className="rounded-lg hover:bg-blue-600 transition">Services</Link></li>
          <li><Link to={"/contact"} className="rounded-lg hover:bg-blue-600 transition">Contact Us</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
  <>
    <div className="dropdown dropdown-end">

      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost flex items-center gap-2"
      >
        <FaUserCircle className="text-2xl text-blue-400" />

        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold">
            {user.name || "User"}
          </p>

          <p className="text-xs text-gray-400">
            My Account
          </p>
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[100] w-56 rounded-box bg-slate-900 shadow-lg border border-blue-700 text-white"
      >

        <li>
          <Link to="/profile">
            👤 My Profile
          </Link>
        </li>

        <li>
          <Link to="/generate-resume">
            📄 Generate Resume
          </Link>
        </li>

        <li>
          <button onClick={handleLogout}>
            🚪 Logout
          </button>
        </li>

      </ul>

    </div>
  </>
) : (
          <>
            <Link to="/login" className="btn btn-ghost text-blue-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/signup" className="btn bg-blue-600 hover:bg-blue-500 text-white border-none transition-all hidden sm:flex">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
