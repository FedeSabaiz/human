const jwt = require('jsonwebtoken');

const createToken = ( { email, first_name, roll} ) => {
    const payload = {
        email,
        first_name,
        roll
    };
    // console.log(payload);
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
};

module.exports = createToken;