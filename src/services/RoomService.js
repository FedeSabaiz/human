const Rooms = require('../models/Room');

const createRoom = (data) => Rooms.create(data);

const getOneRoom = (id) => Rooms.findOne({
    _id: id,
    is_active: true
}).populate({
    path: 'teacher',
    model: 'teacher'
});

const getAllRooms = () => Rooms.find({
    is_active: true
}).populate([{
    path: 'teacher',
    model: 'teacher'
}, {
    path: 'student',
    model: 'student'
}]);

const updateRoom = (id, data) => Rooms.findOneAndUpdate({
    _id: id,
    is_active: true
}, {
    ...data
}, { new: true}).populate('teacher');

const deleteRoom = (id) => Rooms.findOneAndUpdate({
    _id: id,
    is_active: true
}, {
    is_active: false
});

module.exports = {
    createRoom,
    getOneRoom,
    getAllRooms,
    updateRoom,
    deleteRoom
};