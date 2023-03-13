import "reflect-metadata";
import process from 'node:process';
import { App } from './app';
require('dotenv').config()

new App().start().catch(handleError);

process.on('uncaughtException', (err: any) => {
  console.log('[UncaughtException]: ', err);
  process.exit(1);
});
function handleError(e: any) {
  console.log(e);
  process.exit(1);
}
