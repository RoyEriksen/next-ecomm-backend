import express from "express";
import prisma from './src/utils/prisma.js';
import routes from './routes.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // allows handling of json payloads in routes

app.use('/api', routes);

app.get('/api/users', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    res.json(allUsers)
})

app.get('/api/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: userId},
    });
    res.json(user);
});

app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.listen(port, () => {
    console.log(`App started; listening on port ${port}`)
})

