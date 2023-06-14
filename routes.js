import express from 'express';
import prisma from './src/utils/prisma.js';

const router = express.Router();

router.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create ({
        data: { name, email, password },
    });
    res.json(newUser);
});

router.get('/users', async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
});

router.get('/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: userId},
    });
    res.json(user);
});

export default router;

