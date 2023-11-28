import React, { useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEmploy = () => {
  const [imageAdhar, setImageAdhar] = useState("");
  const [imagePan, setImagePan] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const handleAdharImage = (e) => {
    const image = e.target.files[0];
    setImageAdhar(image);
  };
  const handlePanImage = (e) => {
    const image = e.target.files[0];
    setImagePan(image);
  };

  const submitData = async (data) => {
    try {
      const formData = new FormData();
      formData.append("aadharImage", imageAdhar);
      formData.append("pancardImage", imagePan);

      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_server}/addEmployDetails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full p-4 bg-gray-100 bg-opacity-90 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(submitData)}>
          <h2 className=" text-xl mb-4 text-gray-800">
            Add Employee Basic Details!
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
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="dob" className="text-left">
                      DOB:
                      {errors.dob && errors.dob.type === "required" && (
                        <label className="text-sm text-red-600">
                          ( Here please enter the dob )
                        </label>
                      )}
                      {errorMessage && (
                        <p className="error-message text-sm text-red-600">
                          {errorMessage}
                        </p>
                      )}
                    </label>
                    <input
                      {...register("dob", {
                        required: true,
                        validate: handleValidDate,
                      })}
                      type="date"
                      id="dob"
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
                      placeholder="Enter phone number"
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
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="aadharImage" className="text-left">
                      Upload Aadhar image:
                      {errors.aadharImage &&
                        errors.aadharImage.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please upload Aadhar image )
                          </label>
                        )}
                      {errors.aadharImage &&
                        errors.aadharImage.type === "validFileType" && (
                          <label className="text-sm text-red-600">
                            ( Here please upload a valid Aadhar image (jpeg,
                            jpg, or png) )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("aadharImage", {
                        required: true,
                      })}
                      type="file"
                      onChange={handleAdharImage}
                      name="aadharImage"
                      id="aadharImage"
                      className="px-3 py-1 border rounded-lg w-full"
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="pancardImage" className="text-left">
                      Upload PAN card image:
                      {errors.pancardImage &&
                        errors.pancardImage.type === "required" && (
                          <label className="text-sm text-red-600">
                            ( Here please upload PAN card image )
                          </label>
                        )}
                      {errors.pancardImage &&
                        errors.pancardImage.type === "validFileType" && (
                          <label className="text-sm text-red-600">
                            ( Here please upload a valid PAN card image (jpeg,
                            jpg, or png) )
                          </label>
                        )}
                    </label>
                    <input
                      {...register("pancardImage", {
                        required: true,
                      })}
                      type="file"
                      name="pancardImage"
                      onChange={handlePanImage}
                      id="pancardImage"
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

export default AddEmploy;
