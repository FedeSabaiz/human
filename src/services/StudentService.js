const { Students } = require('../models');

const createStudent = (data) => Students.create(data);
const getAllStudents = () => Students.find({
    is_active: true
}).populate({
    path: 'rooms',
    model: 'rooms'
});

const getOneStudent = (id) => Students.findById({
    _id: id,
    is_active: true
}).populate({
    path: 'rooms',
    model: 'rooms'
});

const deleteStudent = (id) => Students.findByIdAndUpdate({
    _id: id,
    is_active: true
}, {
    is_active: false
});

const updateStudent = (id, data) => Students.findByIdAndUpdate({
    _id: id,
    is_active: true
}, {
    ...data
}, {
    new: true
});

const getStudentByEmail = (email) => Students.findOne({
    email,
    is_active: true
}).populate('rooms');

module.exports = {
    createStudent,
    getAllStudents,
    getOneStudent,
    deleteStudent,
    updateStudent,
    getStudentByEmail
};