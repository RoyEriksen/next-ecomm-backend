import express from 'express';
import routes from './routes.js';
import cors from 'cors';


// const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json()); // allows handling of json payloads in routes

app.use('/api', routes);

export default app
