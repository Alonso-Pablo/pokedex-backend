import { Router } from 'express';
import glob from 'glob';

export function registerRoutes(router: Router): void {
  const routes = glob.sync(__dirname + '/**/*.routes.*');
  routes.map((route: string) => register(route, router));
}

function register(routePath: string, app: Router): void {
  const route = require(routePath);
  route.register(app);
}