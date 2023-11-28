const User = require("../Model/user_model");

exports.addEmployDetails = async (req, res) => {
    
  try {
    const aadharImage = req.files['aadharImage'][0]; 
    const pancardImage = req.files['pancardImage'][0]; 
    console.log(aadharImage,pancardImage,"avre kity");
    console.log(req.body,'data from the front end');
    const {
      staff,
      dob,
      currentAddress,
      email,
      permanentAddress,
      phone,
      gender,
      maritalStatus,
      aadharNumber,
      pancardNumber,
      pfNumber,
      uanNumber,
      emergencyContactName,
      emergencyContactAddress,
      emergencyContactNumber,
      emergencyContactPersonRelation,
      esiNumber,
      bloodGroup,
    } = req.body;

    console.log(req.body,'adhar image from the front end');
    console.log(req.body,'pan image from the front end');

    const newUser = new User({
      staff: staff,
      current_address: currentAddress,
      email: email,
      gender: gender,
      aadhar_number: aadharNumber,
      pan_number: pancardNumber,
      pf_number: pfNumber,
      uan_number: uanNumber,
      phone: phone,
      emergency_contact_person_name: emergencyContactName,
      emergency_contact_person_address: emergencyContactAddress,
      permanent_address: permanentAddress,
      dob: dob,
      marital_status: maritalStatus,
      aadhar_image: aadharImage.filename,
      pancard_image: pancardImage.filename,
      esi_number: esiNumber,
      blood_group: bloodGroup,
      emergency_contact_person_number: emergencyContactNumber,
      emergency_contact_person_relation: emergencyContactPersonRelation,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: `${staff}'s details inserted!` });
  } catch (error) {
    console.log(error);
  }
};

exports.employDetails = async (req,res)=>{
    try {
        const employeeData = await User.find()
        console.log(employeeData);
        res
      .status(200)
      .json({ success: true, EmployData :employeeData});
    } catch (error) {
        console.log(error);
    }
}

exports.deleteEmployeeDetails = async (req,res)=>{
    try {
        const employId = req.body.data
        await User.findOneAndDelete({ _id: employId });
        res
        .status(200)
        .json({ success: true, message:"Employee details deleted !"});
    } catch (error) {
        console.log(error);
    }
}

exports.editEmployeeDetails = async (req,res)=>{
    try {
       
    


        await User.updateOne({ _id: req.body.id }, req.body.data).then((updateAccess) => {
            res.status(200).json({ success: true, value:updateAccess });
          });

    } catch (error) {
        console.log(error);
    }
}
exports.employDetailsSingle = async(req,res)=>{
    try {
        console.log(req.query,'==================');
        const value = await User.findById(req.query.id)
        res
        .status(200)
        .json({ success: true,value:value});
        
    } catch (error) {
        console.log(error);
        res
        .status(200)
        .json({ success: false, message:"error !"});
    }
}