// Loads .env file content
require('dotenv').config();

// GraphQL
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');

// Resolvers
const resolvers = require('./src/resolvers');

// Mongoose
const mongoose = require('mongoose');

// mongoose's methods to connect MONGODB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const mongo = mongoose.connection;

mongo.on('error', (error) => console.log(error))
    .once('open', () => console.log('Connected to DB!'));

// TYPEDEFS
const typeDefs = importSchema( __dirname + 'schema.graphql' );

// We pass typeDefs and resolvers to GraphQLServer
const server = new GraphQLServer({typeDefs, resolvers});

const port = process.env.PORT || 4000;

server.start({port}, () => console.log('We are online!'));