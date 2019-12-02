const jwt = require('jsonwebtoken');
const { getTeacherByEmail } = require('../services/TeacherService');   
const { getStudentByEmail } = require('../services/StudentService'); 

const verifyToken = async ( req ) => {
    // console.log(req.get('authorization'));

    try{
        const Authorization = req.get('Authorization');
        // console.log(Authorization);
        if(Authorization){
            // console.log(Authorization);
            const formatedToken = Authorization.replace('JWT ', '');
            // console.log(formatedToken);
            const payload = jwt.verify(formatedToken, process.env.SECRET_KEY);
            if(!payload) return req;
            if(payload.roll === 'T') {
                const teacher = getTeacherByEmail(payload.email);
                if(!teacher) req;
                return teacher;
            }
            if(payload.roll === 'S') {
                const student = getStudentByEmail(payload.email);
                if(!student) return req;
                // console.log(student);
                return student;
            }
            
        } else {
            return {};
        }
    } catch (e) {
        throw new Error(e.message);
    }    
};

module.exports = verifyToken;