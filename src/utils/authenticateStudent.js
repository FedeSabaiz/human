const bcrypt = require('bcrypt');
const { getStudentByEmail } = require('../services/StudentService');  
const createToken = require('./createToken');

const authenticateStudent = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        getStudentByEmail(email).then( user => {
            if(!user) reject(new Error('Student not exist!'));
            bcrypt.compare(password, user.password, (err, isValid) => {
                if(err) reject(new Error('Error to compare'));
                isValid ? resolve(createToken(user)) : reject(new Error('Incorrect Pasword'));
            });
        });
    });
};

module.exports = authenticateStudent;