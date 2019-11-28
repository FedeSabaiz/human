const { getAllRooms, getOneRoom } = require('../../services/RoomService');

const getRooms = async () => {
    const rooms = await getAllRooms();
    if(!rooms) throw new Error('There are not rooms');  
    return rooms;
};

const getSingleRoom = async (_, { id }) => {
    const room = await getOneRoom(id);
    if(!room) throw new Error('Room not exist');
    return room;
};

module.exports = {
    getRooms,
    getSingleRoom
};