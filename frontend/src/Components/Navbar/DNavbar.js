import React from "react";

import ClientLogout from "../Logout/Logout";


export default function DNavbar(props) {
  // console.log(props)

  const {  therapistDashboard, clientDashboard, adminDashboard} = props

  // console.log(therapistDashboard)

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4  shadow-sm animate">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          {therapistDashboard&&<a
            className="text-dark text-sm uppercase hidden md:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Therapist Dashboard
          </a>}

          {clientDashboard && <a
            className="text-dark text-sm uppercase hidden md:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Client Dashboard
          </a>}

          {adminDashboard&&<a
            className="text-dark text-sm uppercase hidden md:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Admiin Dashboard
          </a>}

          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <ClientLogout />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}


