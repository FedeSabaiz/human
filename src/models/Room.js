const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('rooms', RoomSchema );