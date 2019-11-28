const TeacherResolver = require('./TeacherResolvers');
const StudentResolver = require('./StudentResolvers');
const RoomResolver = require('./RoomResolvers');

module.exports = {
    Query: {
        ...TeacherResolver.Query,
        ...StudentResolver.Query,
        ...RoomResolver.Query
    },
    Mutation: {
        ...TeacherResolver.Mutation,
        ...StudentResolver.Mutation,
        ...RoomResolver.Mutation
    }
};
