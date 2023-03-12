import { Server } from './server';

export class App {
  server?: Server;

  async start() {
    const port = process.env.PORT || '3030';
    this.server = new Server(port);

    return this.server.listen();
  }
}