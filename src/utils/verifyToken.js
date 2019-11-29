const jwt = require('jsonwebtoken');
const { getTeacherByEmail } = require('../services/TeacherService');   

const verifyToken = async ( req ) => {
    try{
        const Authorization = req.get('Authorization');
        if(Authorization){
            const formatedToken = Authorization.replace('JWT ', '');
            const payload = jwt.verify(formatedToken, process.env.SECRET_KEY);
            if(!payload) return req;
            const teacher = getTeacherByEmail(payload.email);
            if(!teacher) return req;
            return teacher;
        } else {
            return {};
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = verifyToken;