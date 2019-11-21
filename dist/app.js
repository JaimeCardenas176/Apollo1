"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./lib/schema");
const resolvers_1 = require("./lib/resolvers");
const routes_1 = require("./routes");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../.env") });
class Server {
    constructor() {
        this.graphqlServer = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            playground: {
                endpoint: "/",
                subscriptionEndpoint: "/"
            },
            tracing: false,
            context: ({ req, res }) => ({
                req: req,
                res: res
            })
        });
        this.express = express();
        this.router = routes_1.router();
        this.path = '/';
        this.port = process.env.PORT || 3001;
        this.express.use(this.path, this.router);
        this.graphqlServer.applyMiddleware({
            app: this.express,
            path: this.path,
            cors: true,
            bodyParserConfig: true
        });
        this.express.listen(this.port, (err) => {
            if (err) {
                return console.log(err);
            }
            return console.log(`Server is listening on ${this.port}`);
        });
    }
}
exports.default = new Server().express;
//# sourceMappingURL=app.js.map