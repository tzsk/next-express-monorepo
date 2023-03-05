import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router';

const app = express();

app.use(cors({ origin: '*', allowedHeaders: '*' }));
app.use('/trpc', createExpressMiddleware({ router: appRouter }));

app.listen(9000);
