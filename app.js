import express from 'express';
import cors from 'cors';
import loginRoute from './src/controllers/userAuth.route.js';
import userRoute from './src/controllers/user.route.js'
import editUsersRoute from './src/controllers/editUsers.route.js';
import morgan from 'morgan';

const app = express();
app.use(morgan('combined'))
app.use(cors());
app.use(express.json()); // allows handling of json payloads in routes


app.use('/api', userRoute);
app.use('/api', editUsersRoute);
app.use('/api', loginRoute);

export default app
