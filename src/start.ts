import "reflect-metadata";
import { App } from './app';
require('dotenv').config()

try {
  new App().start().catch(handleError);
} catch (e) {
  handleError(e);
}

process.on('uncaughtException', err => {
  console.log('[UncaughtException]: ', err);
  process.exit(1);
});
function handleError(e: any) {
  console.log(e);
  process.exit(1);
}
