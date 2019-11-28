const mongoose = require('mongoose');

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
    rooms: {
        type: [Schema.Types.ObjectId],
        ref: 'rooms'
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

module.exports = mongoose.model('student', StudentSchema);