const { createRoom, updateRoom, deleteRoom } = require('../../services/RoomService');
// const { getOneTeacher } = require('../../services/TeacherService');

const createNewRoom = async (_, { data }) => {
    const room = await createRoom(data);
    // const teacher = await getOneTeacher(data.teacher);
    // teacher.rooms.push(room);
    // teacher.save();
    return room;
};

const updateOneRoom = async (_, { id, data }) => {
    const room = await updateRoom(id, data);
    if(!room) throw new Error('Room does not exist');
    return room;
};

const deleteOneRoom = async (_, { id }) => {
    const room = await deleteRoom(id);
    if(!room) throw new Error('Room does not exist');
    return ('Room deleted');
};

module.exports = {
    createNewRoom,
    updateOneRoom,
    deleteOneRoom
};