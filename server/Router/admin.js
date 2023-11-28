const express = require("express")
const multer = require('multer');
const adminRouter = express.Router();
const adminController = require("../Controller/admin_controller")
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});
const upload = multer({ storage: storage });


adminRouter.post('/addEmployDetails', upload.fields([{ name: 'aadharImage', maxCount: 1 }, { name: 'pancardImage', maxCount: 1 }]), adminController.addEmployDetails);

adminRouter.get('/employDetails' ,adminController.employDetails)
adminRouter.get('/employDetailsSingle' ,adminController.employDetailsSingle)


adminRouter.post('/deleteEmployeeDetails' ,adminController.deleteEmployeeDetails)
adminRouter.post('/editEmployeeDetails' ,adminController.editEmployeeDetails)

module.exports = adminRouter;