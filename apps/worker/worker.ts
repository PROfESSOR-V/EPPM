import 'dotenv/config';
import { Worker } from 'bullmq';
import taskExtractor from './processors/taskExtraction.processor.js';

const connection = { url: process.env.REDIS_URL! };

new Worker('taskExtraction', taskExtractor, {
  connection,
  concurrency: 2,
});

console.log('Worker listening on taskExtraction queue');
