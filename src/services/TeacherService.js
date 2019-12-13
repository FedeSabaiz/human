const { Teachers } = require('../models');

const createTeacher = (data) => {
    Teachers.syncIndexes();
    return Teachers.create(data);
};
const getAllTeachers = () => Teachers.find({
    is_active: true
}).populate({
    path: 'rooms',
    model: 'rooms'
});

const getOneTeacher = (id) => Teachers.findById({
    _id: id,
    is_active: true
}).populate({
    path: 'rooms',
    model: 'rooms'
});

const deleteTeacher = (id) => Teachers.findByIdAndUpdate({
    _id: id,
    is_active: true
}, {
    is_active: false
});

const updateTeacher = (id, data) => Teachers.findByIdAndUpdate({
    _id: id,
    is_active: true
}, {
    ...data
}, {
    new: true
});

const getTeacherByEmail = (email) => Teachers.findOne({
    email,
    is_active: true
}).populate('rooms');

module.exports = {
    createTeacher,
    getAllTeachers,
    getOneTeacher,
    deleteTeacher,
    updateTeacher,
    getTeacherByEmail
};