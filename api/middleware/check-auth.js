//import Token Creator package
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
//try decoding the token, if not valid or no token at all then throw error
try {
    const token = req.headers.authorization.split(" ")[1];//getting token from the headers make sure we only take the token w/ split method: token in array = [1]
    const decoding = jwt.verify(token, process.env.JWT_KEY); //verify auth
    req.userData = decoding; //extract user data to use them
    (next);
} catch (error) {
    return res.status(401).json({//if we have no match w/ an existing user then return 401 =  lacks valid authentication credentials
        message: ' Authentication failed ! '
    });
  }
};