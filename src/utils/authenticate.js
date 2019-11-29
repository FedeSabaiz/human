const bcrypt = require('bcrypt');
const { getTeacherByEmail } = require('../services/TeacherService');  
const createToken = require('./createToken');

const authenticate = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        getTeacherByEmail(email).then( user => {
            if(!user) reject(new Error('Teacher not exist!'));
            bcrypt.compare(password, user.password, (err, isValid) => {
                if(err) reject(new Error('Error to compare'));
                isValid ? resolve(createToken(user)) : reject(new Error('Incorrect Pasword'));
            });
        });
    });
};

module.exports = authenticate;