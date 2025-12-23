import { NavLink } from "react-router-dom";
import HousesCombo from "../HousesCombo";

export default function Navigation() {  

  return (
    <>
      <nav className="w-full h-16 flex items-center justify-evenly border-b border-gray-300">
        <ul className="flex space-x-8">
          <li className="text-lg font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">
            <NavLink to="/characters">See all Characters</NavLink>
          </li>
          <li className="text-lg font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">
            See all Students
          </li>
          <li className="text-lg font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">
            See all Staffs
          </li>
        </ul>
        <HousesCombo
          onHouseSelect={(house) => console.log('Selected:', house?.name)}
        />
      </nav>
    </>
  );
}