
const studentController = require("../controllers/studentControllers");

module.exports = [
	{
		method: "GET",
		path: "/getAllStudents",
		options: {
            handler: studentController.getStudents
        }
	},
	{
		method: "GET",
		path: "/getStudentByRollNo/{roll}/{token}",
		options: {
            handler: studentController.getStudentByRoll
        }
	},
	{
		method: "PUT",
		path: "/updateStudent/{roll}/{name}",
		options: {
            handler: studentController.updateStudentNameByRoll
        }
	},
	{
		method: "DELETE",
		path: "/deleteStudent/{roll}",
		options: {
            handler: studentController.deleteStudentByRoll
        }
	},
	{
		method: "POST",
		path: "/addNewStudent/{studentData}",
		options: {
            handler: studentController.addNewStudent
        }
	},
	{
		method: "POST",
		path: "/login/{roll}",
		options: {
            handler: studentController.saveUserData
        }
	},
	{
		method: "PUT",
		path: "/logout/{roll}",
		options: {
            handler: studentController.deleteUserData
        }
	},

];
