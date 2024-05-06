const jwt = require("jsonwebtoken");
const SECREAT_KEY = "MY_SECREAT_KEY";

const generatetoken = (user) =>{
    return jwt.sign({id: user.id}, SECREAT_KEY, {expiresIn:'1h'});  //
}
const verifytoken = (user) =>{
    return jwt.verify(user.token , SECREAT_KEY);
}

module.exports={generatetoken,verifytoken};