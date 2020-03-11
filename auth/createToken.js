const privateKey = require("../config/config");
var jwt = require('jsonwebtoken');

exports.createToken = (roll_no) => {

    // console.log(privateKey.getPrivateKey());
    // var key = privateKey.getPrivateKey();

    // var token = jwt.sign( userData, key, { algorithm: 'HS256', expiresIn: "1h" });
    // console.log(token);

    console.log(privateKey.getPrivateKey());
    var key = privateKey.getPrivateKey();

    var token = jwt.sign( {roll : roll_no}, key);
    console.log(token);
    return token;
}
