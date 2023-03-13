import "reflect-metadata";
import cluster from "cluster";
import process from 'node:process';
import os from "os";
import { App } from './app';
require('dotenv').config()

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);
 
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
 
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker. Burn Baby!");
    cluster.fork();
  });
} else {
  new App().start().catch(handleError);
}

process.on('uncaughtException', (err: any) => {
  console.log('[UncaughtException]: ', err);
  process.exit(1);
});
function handleError(e: any) {
  console.log(e);
  process.exit(1);
}
