const TeacherResolver = require('./TeacherResolvers');
const StudentResolver = require('./StudentResolvers');
const RoomResolver = require('./RoomResolvers');
const { EmailAddressResolver, URLResolver } = require('graphql-scalars');

module.exports = {

    EmailAddress: EmailAddressResolver,
    URL: URLResolver,

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
