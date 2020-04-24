const express = require("express");
const mongoose = require("mongoose");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const bodyParser = require("body-parser");
const { merge } = require("lodash");

const courseTypesDefs = require("./types/course.types");
const courseResolvers = require("./resolvers/course.resolvers");

mongoose.connect("mongodb://localhost/graphql_course", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const typeDefs = `
  type Alert{
    message: String
  }

  type Query{
    _: Boolean
  }

  type Mutation{
    _: Boolean
  }
`;

const resolver = {};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, courseTypesDefs],
  resolvers: merge(resolver, courseResolvers),
});

const app = express();

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema: schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(8080, function () {
  console.log("Servidor iniciado en el puerto 8080");
});
