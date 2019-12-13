const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    birth_date: {
        type:String,
    },
    cover: {
        type: String
    },
    rooms: {
        type: [Schema.Types.ObjectId],
        ref: 'rooms'
    },
    roll: {
        type: String,
        enum: ['T', 'S']
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'O']
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

StudentSchema.pre('save', function (next) {
    const student = this;
    const SALT_FACTOR = 10;
    if(!student.isModified('password')) { return next();}
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if(err) return next(err);
        bcrypt.hash(student.password, salt, function (error, hash) {
            if(error) return next(error);
            student.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('student', StudentSchema);