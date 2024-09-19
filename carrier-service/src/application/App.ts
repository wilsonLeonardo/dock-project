import * as http from 'http';
import express, { RequestHandler } from 'express';
import { ILogger } from '@infrastructure/logger/ILogger';

interface AppOptions {
  port: number;
  routes: express.Router;
  logger: ILogger;
  middlewares?: RequestHandler[];
  environment: string;
}

export default class App {
  app: express.Express;
  port: number;
  routes: express.Router;
  logger: ILogger;
  middlewares: RequestHandler[];
  environment: string;

  constructor(options: AppOptions) {
    this.app = express();
    this.port = options.port;
    this.routes = options.routes;
    this.logger = options.logger;
    this.middlewares = options.middlewares || [];
    this.environment = options.environment || '';

    this.handlerMiddlewares();
    this.handlerRoutes();
  }

  private handlerRoutes(): void {
    this.app.use((req, _res, next) => {
      this.logger.info('', {
        method: req.method,
        hostname: req.hostname,
        path: req.path,
        time: new Date(Date.now()).toString(),
      });
      next();
    });
    this.app.use(this.routes);
  }

  private handlerMiddlewares(): void {
    this.middlewares.forEach((value) => this.app.use(value));
  }

  async listen(): Promise<http.Server> {
    return this.app.listen(this.port, () => {
      this.logger.info(`Application carrier is running. Listening on http://localhost:${this.port}`);
      this.logger.info('Press CTRL+C to exit');
    });
  }
}
