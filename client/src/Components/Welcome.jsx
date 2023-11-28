import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <img src="bg.jpg" alt="Your Image" className="w-full" />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="h-16 w-full">
          <div className="flex justify-between mt-2">
            <div className="w-34 h-12 pt-2 ml-4 sm:ml-8 md:ml-12 lg:ml-20 xl:ml-24 flex justify-center"></div>
          </div>
        </div>
        <div className="text-white mono flex justify-center items-center sm:h-96 md:h-80 lg:h-96 xl:h-96">
          <div>
            <p className="text-lg sm:text-4xl pb-1"> Employee management </p>
            <p className="text-sm sm:text-xl">
              By Chaithra KR , Full Stack web developer specializing in MERN
              Stack
            </p>
            <div className="sm:flex justify-center mr-8 hidden sm:pt-8">
              <button
                 onClick={() => {
                    navigate("/dashboard");
                  }}
        
                className="px-3 py-2 border border-transparent font-bold text-black rounded-full bg-white shadow-md hover:text-white hover:bg-white hover:bg-opacity-40"
              >
                Click to start!
              </button>
            </div>
          </div>
        </div>
        <div className="h-96 flex mt-0 sm:mt-5 justify-center ">
          <div className="text-xl text-white">
            <p className="font-bold pb-1">About the work </p>
            <p>
              Successfully completed a machine test by creating a robust
              Employee
            </p>
            <p>Management Web Application using the MERN stack. The application</p>
            <p>empowers administrators to effortlessly add, view, and manage</p>
            <p>employee details with seamless CRUD operations. Implemented an</p>
            <p>intuitive form submission system, ensuring efficient data handling</p>
            <p>and administration through the entire employee lifecycle.</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
