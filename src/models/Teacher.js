const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    birth_date: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'O']
    },
    rooms: {
        type: [Schema.Types.ObjectId],
        ref: 'rooms'
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

TeacherSchema.pre('save', function (next) {
    const teacher = this;
    const SALT_FACTOR = 10;
    if(!teacher.isModified('password')) { return next();}
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if(err) return next(err);
        bcrypt.hash(teacher.password, salt, function (error, hash) {
            if(error) return next(error);
            teacher.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('teacher', TeacherSchema);