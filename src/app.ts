import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './lib/schema';
import { resolvers } from './lib/resolvers';
import { router } from "./routes";

import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });



class Server {

    public express: express.Express;
    private router: express.Router;
    private port: any;
    private path: string;

    private graphqlServer: ApolloServer = new ApolloServer({
        typeDefs,
        resolvers,
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

    constructor(){
        this.express=express();
        this.router=router();
        this.path='/'
        this.port = process.env.PORT || 3001;

        this.express.use(this.path, this.router);
        this.graphqlServer.applyMiddleware({
        app: this.express,
        path: this.path,
        cors: true,
        bodyParserConfig: true
      });
      
      this.express.listen(this.port, (err: Error) => {
        if (err) {
          return console.log(err);
        }
        return console.log(`Server is listening on ${this.port}`);
      });
    }


}

export default new Server().express;