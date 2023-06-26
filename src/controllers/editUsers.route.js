import express from 'express';
import prisma from "../utils/prisma.js";
import { filter } from "../utils/common.js";
import { validateUser } from '../validators/users.js';

const editUsersRoute = express.Router();

editUsersRoute.get('/users/:id', async (req, res) => {
    const data = req.body;
    
    const validationErrors = validateUser(data);
    
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
        error: validationErrors
    })

    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: userId},
    });
    
    if (!user) {
        return res.status(404).json({error: 'User not found' });
    }
    
    //Filter out the password property using the filter function
    const filteredUser = filter(user, 'id', 'firstName', 'lastName', 'email');
    
    res.json(filteredUser);
});

editUsersRoute.put('/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const { firstName, lastName, email, password } = req.body;
    
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                email,
            },
        });
        
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

editUsersRoute.delete('/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    
    try {
        // Delete the user with the specified ID
        await prisma.user.delete({
            where: { id: userId },
        });
        
        res.json({ message: 'User deleted succssfully' });
    } catch (error){
        res.status(500).json({ error: 'Failed to delete user' })
    }
});

export default editUsersRoute;
