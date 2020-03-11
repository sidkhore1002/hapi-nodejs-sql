const Hapi = require("@hapi/hapi");
const MySQL = require('mysql');
const forDatabaseConnection = require('../server.js');
var createToken = require('../auth/createToken.js');

//login
exports.saveUserData = (request, h) =>{    
    var roll = h.request.params.roll;    
    var token = createToken.createToken(roll);

    return new Promise((resolve, reject) => {
        var sql = 'update students SET token = "' + token +  '" where roll = ' + roll ;
 
//        var sql = 'insert into students values("' + roll + '","' + student_name + '","' + student_marks + '","' + student_address + '","' + student_email + '","' + student_phone + '","' + " " + '")';

        forDatabaseConnection.connection.query(sql,function (err, result) {
            if (err) throw err;    
            //console.log(result);
            res = result;
            resolve(h.response(res));
        }); 

    });
};

//logout
exports.deleteUserData = (request, h) =>{    
    var roll = h.request.params.roll;    

    return new Promise((resolve, reject) => {
        var sql = "update students SET token = " + " " +  " where roll = " + roll;

        forDatabaseConnection.connection.query(sql,function (err, result) {
            if (err) throw err;    
            //console.log(result);
            res = result;
            resolve(h.response(res));
        }); 

    });
};

//get all students
exports.getStudents = (request, h) =>{    
    return new Promise((resolve, reject) => {
        var sql = "select * from students";
        forDatabaseConnection.connection.query(sql,function (err, result) {
            if (err) throw err;    
            //console.log(result);
            res = result;
            resolve(h.response(res));
        }); 

    });
};

async function gettoken(roll, userToken) {
    var sql1 = "select token from students where roll = " + roll;
    var savedToken;
    forDatabaseConnection.connection.query(sql1,function (err, result) {
        if (err) throw err;    
        savedToken = result[0].token;

        if(userToken == savedToken){
            console.log(userToken);
            console.log(savedToken);
           
            var sql = "select * from students where roll = " + roll;
            forDatabaseConnection.connection.query(sql,function (err, result) {
                if (err) throw err;    
                var res = result;
                return res;
            }); 
        }
        else{
            return 0;
        }

    }); 
}


exports.getStudentByRoll = async(request, h) => {
    let roll = h.request.params.roll;    
    var userToken = h.request.params.token;    

    var ss;
    ss = await gettoken(roll,userToken);
    console.log(ss);
    
    if(ss != 0){
        return new Promise((resolve, reject) => {
            resolve(h.response(ss));
        });  
    }
    else{
        return new Promise((resolve, reject) => {
            resolve(h.response("no data found.."));
        });  
    }
    // var s = await getStudent(savedToken, userToken);
    // return s;
};

exports.updateStudentNameByRoll = (request, h) =>{
    console.log(h.request.params);

    let roll_no = h.request.params.roll;    
    var name = h.request.params.name.toString();    
    
    return new Promise((resolve, reject) => {
        console.log(name);
        
        var sql = "update students SET student_name = " + name + " where roll = " + roll_no;
        forDatabaseConnection.connection.query(sql,function (err, result) {
            if (err) throw err;    
            //console.log(result);
            res = result;
            resolve(h.response("Updated 1 record"));
        }); 

    });
};

exports.deleteStudentByRoll = (request, h) =>{
    console.log(h.request.params);
    let roll_no = h.request.params.roll;    
    
    return new Promise((resolve, reject) => {
        var sql = "delete from students where roll = " + roll_no;
        forDatabaseConnection.connection.query(sql,function (err, result) {
            if (err) throw err;    
            //console.log(result);
            res = result;
            resolve(h.response("Deleted 1 student"));
        }); 

    });
};

exports.addNewStudent = (request, h) =>{
    var studentData = JSON.parse(h.request.params.studentData);
    console.log(studentData);
    
    let roll = studentData.roll;    
    var student_name = studentData.student_name.toString();    
    var student_marks = studentData.student_marks;    
    var student_address = studentData.student_address.toString();    
    var student_email = studentData.student_email.toString();    
    var student_phone = studentData.student_phone.toString();    
    
    return new Promise((resolve, reject) => {
        var sql = 'insert into students values("' + roll + '","' + student_name + '","' + student_marks + '","' + student_address + '","' + student_email + '","' + student_phone + '","' + " " + '")';
        forDatabaseConnection.connection.query(sql,function (err, result) {
            if (err) throw err;    
            //console.log(result);
            res = result;
            resolve(h.response("Added New student"));
        }); 

    });
};

