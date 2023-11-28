import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const EditDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [employeeData, setEmployeeData] = useState({});
  const [changedData, setChangedData] = useState({});
const [refresh,setRefresh] =useState(false)
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleValidDate = (selectedDate) => {
    if (!selectedDate) {
      setErrorMessage("");
      return true;
    }
    const age = moment().diff(selectedDate, "years");
    if (age < 18) {
      setErrorMessage("( Maximum age requirement is 18! )");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };
  useEffect(() => {
    const handleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/employDetailsSingle?id=${location.state.employeeData}`);
        const data = response.data.value;
        setEmployeeData(data);
        console.log("Employee Data:", response.data.EmployData);
      } catch (error) {
        console.log(error);
      }
    };
    handleDetails();
  }, [refresh]);

  const handleDetailsEdit = async () => {
    const response = await axios.post(
      `http://localhost:7000/editEmployeeDetails`,
      {
        data: changedData,
        id:location.state.employeeData
      }
    )
    if(response.data.success){
        setEmployeeData(response.data.value)
        toast.success("Employee Data updated!", {
            duration: 3000,
            position: "top-right",
            style: {
              background: "#B00043",
              color: "#fff",
            },
          });
          refresh?setRefresh(false):setRefresh(true)
    }else{
        toast.error('something went wrong')
    }
    
  };

  const handleFieldChange = (fieldName, value) => {
    setChangedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div>
      <div className="w-full p-4 bg-gray-100 bg-opacity-90 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(handleDetailsEdit)}>
          <h2 className=" text-xl mb-4 text-gray-800">
            Edit Employee Basic Details!
          </h2>
          <fieldset className="px-2 bg-white pt-3">
            <ul>
              <li className="grid gap-2x">
                <div className="grid grid-cols-2 space-x-4 p-2">
                  <div className="col-span-1 ml-5">
                    <label htmlFor="staff" className="text-left">
                      Staff name:{" "}
                      {errors.staff && errors.staff.type === "required" && (
                        <label className="text-sm text-red-600">
                          ( Here please enter the staff name )
                        </label>
                      )}
                      {errors.staff && errors.staff.type === "pattern" && (
                        <label className="text-sm text-red-600">
                          ( Here please enter valid staff name )
                        </label>
                      )}
                    </label>
                    <input
                      {...register("staff", {
                        required: true,
                        pattern: /^[a-zA-Z-' ]+$/,
                      })}
                      type="text"
                      id="staff"
                      defaultValue={employeeData?.staff}
                      onChange={(e) =>
                        handleFieldChange("staff", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="currentAddress" className="text-left">
                      Current address:{" "}
                      {errors.currentAddress &&
                        errors.currentAddress.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the currentAddress )
                          </label>
                        )}
                      {errors.currentAddress &&
                        errors.currentAddress.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Please enter a valid current address, maximum 180
                            characters )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("currentAddress", {
                        required: true,
                        pattern: /^.{2,180}$/,
                      })}
                      defaultValue={employeeData?.current_address}
                      onChange={(e) =>
                        handleFieldChange("currentAddress", e.target.value)
                      }
                      type="text"
                      id="currentAddress"
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="email" className="text-left">
                      Email:
                      {errors.email && errors.email.type === "required" && (
                        <label className="text-sm text-red-600">
                          ( Here please enter the email )
                        </label>
                      )}
                      {errors.email && errors.email.type === "pattern" && (
                        <label className="text-sm text-red-600">
                          ( Here please enter a valid email )
                        </label>
                      )}
                    </label>
                    <input
                      {...register("email", {
                        required: true,
                        pattern:
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      })}
                      type="email"
                      defaultValue={employeeData?.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      id="email"
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="permanentAddress" className="text-left">
                      Permanent address:
                      {errors.permanentAddress &&
                        errors.permanentAddress.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the permanent address )
                          </label>
                        )}
                      {errors.permanentAddress &&
                        errors.permanentAddress.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Please enter a valid permanent address, maximum
                            180 characters )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("permanentAddress", {
                        required: true,
                        pattern: /^.{2,180}$/,
                      })}
                      type="text"
                      defaultValue={employeeData?.permanent_address}
                      onChange={(e) =>
                        handleFieldChange("permanentAddress", e.target.value)
                      }
                      id="permanentAddress"
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="phone" className="text-left">
                      Phone:{" "}
                      {errors.phone && errors.phone.type === "required" && (
                        <label className="text-sm text-red-600">
                          (Here please enter a valid 10-digit phone number )
                        </label>
                      )}
                      {errors.phone && errors.phone.type === "pattern" && (
                        <label className="text-sm text-red-600">
                          ( Here please enter a valid phone )
                        </label>
                      )}
                    </label>
                    <input
                      {...register("phone", {
                        required: true,
                        pattern: /^[0-9]{10}$/,
                      })}
                      type="tel"
                      id="phone"
                      defaultValue={employeeData?.phone}
                      onChange={(e) =>
                        handleFieldChange("phone", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="gender" className="text-left">
                      Gender:
                      {errors.gender && errors.gender.type === "required" && (
                        <label className="text-sm text-red-600">
                          ( Here please select the gender )
                        </label>
                      )}
                    </label>
                    <select
                      {...register("gender", {
                        required: true,
                      })}
                      id="gender"
                      value={employeeData?.gender}
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="maritalStatus" className="text-left">
                      Marital status:{" "}
                      {errors.maritalStatus &&
                        errors.maritalStatus.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please select the marital status )
                          </label>
                        )}
                    </label>
                    <select
                      {...register("maritalStatus", {
                        required: true,
                      })}
                      id="maritalStatus"
                      value={employeeData?.marital_status}
                      onChange={(e) =>
                        handleFieldChange("maritalStatus", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    >
                      <option value="">Select Marital Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="aadharNumber" className="text-left">
                      Aadhar Number:
                      {errors.aadharNumber &&
                        errors.aadharNumber.type === "required" && (
                          <label className="text-sm text-red-600">
                            (Here please enter the Aadhar Number )
                          </label>
                        )}
                      {errors.aadharNumber &&
                        errors.aadharNumber.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid Aadhar Number (12
                            digits) )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("aadharNumber", {
                        required: true,
                        pattern: /^\d{12}$/,
                      })}
                      type="Number"
                      id="aadharNumber"
                      defaultValue={employeeData?.aadhar_number}
                      onChange={(e) =>
                        handleFieldChange("aadharNumber", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="pancardNumber" className="text-left">
                      Pancard Number:
                      {errors.pancardNumber &&
                        errors.pancardNumber.type === "required" && (
                          <label className="text-sm text-red-600">
                            (Here please enter the Pancard Number )
                          </label>
                        )}
                      {errors.pancardNumber &&
                        errors.pancardNumber.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid Pancard Number )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("pancardNumber", {
                        required: true,
                        pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                      })}
                      type="text"
                      id="pancardNumber"
                      defaultValue={employeeData?.pan_number}
                      onChange={(e) =>
                        handleFieldChange("pancardNumber", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="pfNumber" className="text-left">
                      PF Number:
                      {errors.pfNumber &&
                        errors.pfNumber.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the PF Number )
                          </label>
                        )}
                      {errors.pfNumber &&
                        errors.pfNumber.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid PF Number )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("pfNumber", {
                        required: true,
                        pattern: /^[A-Za-z0-9]*$/,
                      })}
                      type="text"
                      id="pfNumber"
                      defaultValue={employeeData?.pf_number}
                      onChange={(e) =>
                        handleFieldChange("pfNumber", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="uanNumber" className="text-left">
                      UAN Number:
                      {errors.uanNumber &&
                        errors.uanNumber.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the UAN Number )
                          </label>
                        )}
                      {errors.uanNumber &&
                        errors.uanNumber.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid UAN Number )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("uanNumber", {
                        required: true,
                        pattern: /^[A-Za-z0-9]*$/,
                      })}
                      type="text"
                      id="uanNumber"
                      defaultValue={employeeData?.uan_number}
                      onChange={(e) =>
                        handleFieldChange("uanNumber", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="emergencyContactName" className="text-left">
                      Emergency contact person's name:
                      {errors.emergencyContactName &&
                        errors.emergencyContactName.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the name )
                          </label>
                        )}
                      {errors.emergencyContactName &&
                        errors.emergencyContactName.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid name )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("emergencyContactName", {
                        required: true,
                        pattern: /^[A-Za-z\s]+$/,
                      })}
                      type="text"
                      id="emergencyContactName"
                      defaultValue={employeeData?.emergency_contact_person_name}
                      onChange={(e) =>
                        handleFieldChange(
                          "emergencyContactName",
                          e.target.value
                        )
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="emergencyContactNumber"
                      className="text-left"
                    >
                      Emergency contact person's number:
                      {errors.emergencyContactNumber &&
                        errors.emergencyContactNumber.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the phone number )
                          </label>
                        )}
                      {errors.emergencyContactNumber &&
                        errors.emergencyContactNumber.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid phone number )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("emergencyContactNumber", {
                        required: true,
                        pattern: /^[0-9]+$/,
                      })}
                      type="tel"
                      id="emergencyContactNumber"
                      defaultValue={employeeData?.emergency_contact_person_number}
                      onChange={(e) =>
                        handleFieldChange(
                          "emergencyContactNumber",
                          e.target.value
                        )
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="emergencyContactAddress"
                      className="text-left"
                    >
                      Emergency contact person's address:
                      {errors.emergencyContactAddress &&
                        errors.emergencyContactAddress.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the address )
                          </label>
                        )}
                      {errors.emergencyContactAddress &&
                        errors.emergencyContactAddress.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid address )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("emergencyContactAddress", {
                        required: true,
                        pattern: /^[\w\s.,-]+$/,
                      })}
                      type="text"
                      id="emergencyContactAddress"
                      defaultValue={employeeData?.emergency_contact_person_address}
                      onChange={(e) =>
                        handleFieldChange(
                          "emergencyContactAddress",
                          e.target.value
                        )
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="esiNumber" className="text-left">
                      ESI Number:
                      {errors.esiNumber &&
                        errors.esiNumber.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the ESI Number )
                          </label>
                        )}
                      {errors.esiNumber &&
                        errors.esiNumber.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid ESI Number )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("esiNumber", {
                        required: true,
                        pattern: /^[A-Za-z0-9]*$/,
                      })}
                      type="text"
                      id="esiNumber"
                      defaultValue={employeeData?.esi_number}
                      onChange={(e) =>
                        handleFieldChange("esiNumber", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="bloodGroup" className="text-left">
                      Blood Group:{" "}
                      {errors.bloodGroup &&
                        errors.bloodGroup.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the Blood Group )
                          </label>
                        )}
                      {errors.bloodGroup &&
                        errors.bloodGroup.type === "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid blood group (e.g., A+,
                            B-, AB+, O+) )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("bloodGroup", {
                        required: true,
                        pattern: /^(A|B|AB|O)[\+-]$/i,
                      })}
                      type="text"
                      id="bloodGroup"
                      defaultValue={employeeData?.blood_group}
                      onChange={(e) =>
                        handleFieldChange("bloodGroup", e.target.value)
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="emergencyContactPersonRelation"
                      className="text-left"
                    >
                      Emergency contact person relationship:
                      {errors.emergencyContactPersonRelation &&
                        errors.emergencyContactPersonRelation.type ===
                          "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter the relationship )
                          </label>
                        )}
                      {errors.emergencyContactPersonRelation &&
                        errors.emergencyContactPersonRelation.type ===
                          "pattern" && (
                          <label className="text-sm text-red-600">
                            ( Here please enter a valid relationship (only
                            letters and spaces) )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("emergencyContactPersonRelation", {
                        required: true,
                        pattern: /^[A-Za-z\s]+$/,
                      })}
                      type="text"
                      id="emergencyContactPersonRelation"
                      defaultValue={employeeData?.emergency_contact_person_relation}
                      onChange={(e) =>
                        handleFieldChange(
                          "emergencyContactPersonRelation",
                          e.target.value
                        )
                      }
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>
                </div>
              </li>
            </ul>
            <div className="space-x-2 pt-4">
              <button className="px-4 py-1 rounded-lg shadow bg-yellow-300 hover:border-white">
                Submit
              </button>
              <button className="px-4 py-1 rounded-lg shadow text-white bg-gray-500 hover:border-white">
                cancel
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default EditDetails;
