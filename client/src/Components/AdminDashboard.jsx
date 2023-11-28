import React, { useEffect, useState } from "react";
import {
  MdSpaceDashboard,
  MdOutlineArrowDropDown,
  MdDeleteForever,
  MdAdd,
} from "react-icons/md";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidCategory } from "react-icons/bi";
import { FaBookOpen, FaUsers, FaEye, FaSearch } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [showDrop, setShowDrop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [shoSearchBar, setShowSearchBar] = useState(false);
  const [index,setIndex] = useState(0)

  const navigate = useNavigate();
  const handleDrop = () => {
    setShowDrop(!showDrop);
    setShowEmployeeDetails(false);
  };

  const toggleModal = (i) => {
    setIndex(i)
    setIsModalOpen(!isModalOpen);
  };

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const regex = new RegExp(query, "i");
    const filtered = query
      ? searchFilter.filter(
          (employee) => regex.test(employee.staff) || regex.test(employee._id)
        )
      : employeeData;
    setEmployeeData(filtered);
  };

  const handleEditDetails = async (id) => {
    try {
     
        const firstEmployeeData = id;
        navigate("/edit-employeeDetails", {
          state: { employeeData: firstEmployeeData },
        });
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEmploy = async (employId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_server}deleteEmployeeDetails`,
        {
          data: employId,
        }
      );
      if (refresh === true) {
        setRefresh(false);
      } else {
        setRefresh(true);
      }
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleEmployData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_server}employDetails`);
        setEmployeeData(response.data.EmployData);
        setSearchFilter(response.data.EmployData);
      } catch (error) {
        console.log(error);
      }
    };
    handleEmployData();
  }, [refresh]);

  return (
    <div>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <button class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-blue-600 hover:text-white">
                <MdSpaceDashboard />
                <span class="ms-3">Dashboard</span>
              </button>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-blue-600 hover:text-white"
              >
                <BsFillMenuButtonWideFill />
                <span class="ms-3">Inventary</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group  hover:bg-blue-600 hover:text-white"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <GiHamburgerMenu />
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Menu
                </span>
                <MdOutlineArrowDropDown />
              </button>
            </li>
            <li>
              <button
                type="button"
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group  hover:bg-blue-600 hover:text-white"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <BiSolidCategory />
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Categories
                </span>
                <MdOutlineArrowDropDown />
              </button>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-blue-600 hover:text-white"
              >
                <FaBookOpen />
                <span class="flex-1 ms-3 whitespace-nowrap">Passbook</span>
              </a>
            </li>
            <li>
              <button
                onClick={handleDrop}
                class="flex items-center w-full p-2 text-base bg-gray-200 text-gray-900 transition duration-75 rounded-lg group  hover:bg-blue-600 hover:text-white"
              >
                <FaUsers />
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Employ Management
                </span>
                <MdOutlineArrowDropDown />
              </button>
              {showDrop ? (
                <div>
                  <ul>
                    <li>
                      <button
                        onClick={() => {
                          setShowEmployeeDetails(true);
                        }}
                        class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-600 hover:text-white"
                      >
                        Basic Details
                      </button>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-600 hover:text-white"
                      >
                        Employee Details
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-blue-600 hover:text-white"
              >
                <FaUsers />
                <span class="flex-1 ms-3 whitespace-nowrap">Customers</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-blue-600 hover:text-white"
              >
                <TfiMenuAlt />
                <span class="flex-1 ms-3 whitespace-nowrap">Reporters</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64">
        {showEmployeeDetails ? (
          <>
            <div className="flex items-center px-7 bg-gray-50 w-full h-16 shadow-lg mb-3">
              {shoSearchBar ? (
                <input
                  id="search"
                  type="text"
                  placeholder="Search by staff or Id..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="border rounded-lg px-4 py-2 w-64 sm:w-72 md:w-96 focus:outline-none focus:border-pink-300"
                />
              ) : (
                <button
                  onClick={() => {
                    setShowSearchBar(true);
                  }}
                >
                  <FaSearch />
                </button>
              )}
            </div>
            <section className="ml-8">
              <div className="flex justify-between pb-5 mr-28">
                <h1 className="text-3xl">Employee Basic Details</h1>
                <button
                  onClick={handleAddEmployee}
                  class="flex items-center w-48 p-2 bg-black transition duration-75 rounded-lg group text-white"
                >
                  <MdAdd className=" text-2xl font-bold " />
                  <span class="flex-1 ps-2 text-left text-base rtl:text-right whitespace-nowrap">
                    Add Basic Details
                  </span>
                </button>
              </div>
              <table className="w-11/12 min-w-max table-auto text-left bg-gray-50 ">
                <thead className=" rounded-md bg-blue-800 text-white ">
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <span className="font-normal leading-none opacity-70">
                        S.No.
                      </span>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <span className="font-normal leading-none opacity-70">
                        Staff name
                      </span>
                    </th>

                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-10 p-4">
                      <span className="font-normal leading-none opacity-70">
                        Phone number
                      </span>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-10 p-4">
                      <span className="font-normal leading-none opacity-70">
                        Current address
                      </span>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-10 p-4">
                      <span className="font-normal leading-none opacity-70">
                        Email id
                      </span>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-10 p-4">
                      <span className="font-normal leading-none opacity-70">
                        View
                      </span>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-10 p-4">
                      <span className="font-normal leading-none opacity-70">
                        Update
                      </span>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 pl-10 p-4">
                      <span className="font-normal leading-none opacity-70">
                        Delete
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="h-4/6 overflow-scroll">
                  {employeeData.map((employee, i) => (
                    <tr key={i}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <span className="font-normal">{i + 1}</span>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <span className="font-normal">{employee.staff}</span>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <span className="font-normal">{employee.phone}</span>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <span className="font-normal">
                          {employee.current_address}
                        </span>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <span className="font-normal">{employee.email}</span>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50 ">
                        <button
                          onClick={()=>{toggleModal(i)}}
                          className="w-full flex justify-center"
                        >
                          <FaEye className="fill-current text-orange-500" />
                        </button>
{index==i ?
                        <div>
                          {isModalOpen &&  (
                            <div
                              id="default-modal"
                              tabIndex="-1"
                              aria-hidden="true"
                              className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
                            >
                              
                              <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>

                              <div className="bg-white w-1/2 p-8 rounded shadow-lg relative">
                                <div className="flex items-center justify-between pb-4 border-b rounded-t dark:border-gray-600">
                                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
                                    Employee Basic Details
                                  </h3>
                                  <button
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    &times;
                                    <span className="sr-only">Close modal</span>
                                  </button>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="mb-3 text-xl h-96 overflow-y-auto">
                                    <div className="flex items-center">
                                      <span className="w-96">Staff name </span>
                                      <p>{employee.staff}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Current address
                                      </span>
                                      <p>{employee.current_address}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">email </span>
                                      <p>{employee.email}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">gender </span>
                                      <p>{employee.gender}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Aadhar number
                                      </span>
                                      <p>{employee.aadhar_number}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">PAN number </span>
                                      <p>{employee.pan_number}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">PF number </span>
                                      <p>{employee.pf_number}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">UAN number </span>
                                      <p>{employee.uan_number}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Phone number
                                      </span>
                                      <p>{employee.phone}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Permanent address
                                      </span>
                                      <p>{employee.permanent_address}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">DOB </span>
                                      <p>{employee.dob}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Marital status
                                      </span>
                                      <p>{employee.marital_status}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">ESI number </span>
                                      <p>{employee.esi_number}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">Blood group</span>
                                      <p>{employee.blood_group}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Emergency contact person's name
                                      </span>
                                      <p>
                                        {employee.emergency_contact_person_name}
                                      </p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Emergency contact person's number
                                      </span>
                                      <p>
                                        {
                                          employee.emergency_contact_person_number
                                        }
                                      </p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Emergency contact person's relation
                                      </span>
                                      <p>
                                        {
                                          employee.emergency_contact_person_relation
                                        }
                                      </p>
                                    </div>

                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Emergency contact person's address
                                      </span>
                                      <p>
                                        {
                                          employee.emergency_contact_person_address
                                        }
                                      </p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        Aadhar image
                                      </span>
                                      <img
                                        src={`${import.meta.env.VITE_server}uploads/${employee?.aadhar_image}`}
                                        width={100}
                                        height={100}
                                        alt="aadhar"
                                      />
                                    </div>
                                    <div className="flex items-center">
                                      <span className=" w-96">
                                        PAN card image
                                      </span>
                                      <img
                                        width={100}
                                        height={100}
                                        src={`${import.meta.env.VITE_server}uploads/${employee?.pancard_image}`}
                                        alt="pan"
                                      />
                                    </div>
                                  </div>
                                </div>






                                <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                  <button
                                    onClick={toggleModal}
                                    className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                  >
                                    Close
                                  </button>
                                </div>
                                
                              </div>

                            </div>
                            
                          )}
                        </div>



:null}


                      </td>
                      <td className="p-4 border-b border-blue-gray-50 ">
                        <button
                          onClick={()=>{handleEditDetails(employee._id)}}
                          className="w-full flex justify-center"
                        >
                          <FiEdit3 className="fill-current text-gray-500" />
                        </button>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <button
                          onClick={() => {
                            handleDeleteEmploy(employee._id);
                          }}
                          className="w-full flex justify-center"
                        >
                          <MdDeleteForever className="fill-current text-orange-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        ) : (
          <div className="flex justify-center items-center h-96">
            <h1 className="font-bold text-3xl">
              {" "}
              Select basic details in Employ management
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
