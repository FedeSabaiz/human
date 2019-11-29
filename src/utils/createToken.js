const jwt = require('jsonwebtoken');

const createToken = ( { email, firts_name} ) => {
    const payload = {
        email,
        firts_name
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
};

module.exports = createToken;