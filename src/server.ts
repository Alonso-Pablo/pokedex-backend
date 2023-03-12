import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import cors from 'cors';
import { registerRoutes } from './routes';
import { ErrorHandler } from './Shared/infraestructure/ErrorHandler';
import { MongoDB } from './Shared/infraestructure/persistence/MongoDB';

export class Server {
  private app: express.Express;
  readonly port: string;
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(ErrorHandler.catch);
    const router = Router();
    router.use(cors());
    router.use(errorHandler());
    this.app.use('/api', router)

    registerRoutes(router);

    this.app.get('/', (req: Request, res: Response) => {
      res.send('It works!')
    })
  }

  async listen(): Promise<void> {
    await MongoDB.connect()
    return new Promise(resolve => {
      this.httpServer = this.app.listen(this.port, () => {
        console.log(
          `  Backend is running at port ${this.port} in ${process.env.NODE_ENV} mode`
        );
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
