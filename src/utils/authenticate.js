const bcrypt = require('bcrypt');
const { getTeacherByEmail } = require('../services/TeacherService');
const { getStudentByEmail } = require('../services/StudentService');
const createToken = require('./createToken');

const authenticate = ({ email, password, roll }) => {
    return new Promise((resolve, reject) => {
        // const result = getStudentByEmail(email);
        if(roll === 'T') {
            console.log('Me ejecuto!!!');
            getTeacherByEmail(email).then( user => {
                console.log(user);
                if(!user) reject(new Error('Teacher not exist!'));
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if(err) reject(new Error('Error to compare'));
                    isValid ? resolve(createToken(user)) : reject(new Error('Incorrect Pasword'));
                });
            });
        }
        if(roll === 'S') {
            getStudentByEmail(email).then( user => {
                // console.log(user);
                if(!user) reject(new Error('Student not exist!'));
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if(err) reject(new Error('Error to compare'));
                    isValid ? resolve(createToken(user)) : reject(new Error('Incorrect Pasword'));
                });
            });
        }
    });
};

module.exports = authenticate;