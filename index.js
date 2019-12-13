// Loads .env file content
require('dotenv').config();

// GraphQL
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
// Resolvers
const resolvers = require('./src/resolvers');
const AuthDirective = require('./src/Resolvers/Directives/AuthDirective');
const verifyToken = require('./src/utils/verifyToken');

// Mongoose
const mongoose = require('mongoose');
console.log(process.env.NODE_ENV);
const MONGO_URI = process.env.NODE_ENV === 'test' ?
    process.env.MONGO_TEST_URL : process.env.MONGO_URL;

// mongoose's methods to connect MONGODB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const mongo = mongoose.connection;

mongo.on('error', (error) => {return error;})
    .once('open', () => {});

// TYPEDEFS
const typeDefs = importSchema( __dirname + '/schema.graphql' );

// We pass typeDefs and resolvers to GraphQLServer
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
        AuthDirective
    },
});
const server = new GraphQLServer({
    schema,
    context: async (contextParams) => ({
        ...contextParams,
        user: contextParams.request ? await verifyToken(contextParams.request) : {}
    })
});

const port = process.env.PORT || 4000;

server.start({port}, () => {});

module.exports = {
    schema
};