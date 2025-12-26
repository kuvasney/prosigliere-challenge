import { NavLink } from "react-router-dom";
import { useState } from "react";
import HousesCombo from "./HousesCombo";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="mb-8">
      <h1 className="text-2xl md:text-4xl font-almendra text-house-primary text-shadow-readable border-b border-gray-300 text-center pb-4">
        The Harry Potter Mischief Managed App
      </h1>
      <nav className="w-full min-h-16 flex flex-col md:flex-row items-center justify-between md:justify-evenly border-b border-gray-300 py-4 px-4">
        <button
          className="md:hidden self-end text-3xl text-house-primary text-shadow-readable"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 md:space-x-8 md:gap-0 text-center w-full md:w-auto`}
        >
          <li className="text-base md:text-lg font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-base md:text-lg font-semibold cursor-pointer ${
                  isActive
                    ? "text-house-primary border-b-2 border-house-primary text-shadow-readable"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              See all Characters
            </NavLink>
          </li>
          <li className="text-base md:text-lg font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">
            <NavLink
              to="/students"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-base md:text-lg font-semibold cursor-pointer ${
                  isActive
                    ? "text-house-primary border-b-2 border-house-primary text-shadow-readable"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              See all Students
            </NavLink>
          </li>
          <li className="text-base md:text-lg font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">
            <NavLink
              to="/staff"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-base md:text-lg font-semibold cursor-pointer ${
                  isActive
                    ? "text-house-primary border-b-2 border-house-primary text-shadow-readable"
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              See all Staffs
            </NavLink>
          </li>
        </ul>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex w-full md:w-auto`}
        >
          <HousesCombo />
        </div>
      </nav>
    </section>
  );
}
