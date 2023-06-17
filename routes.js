import express from 'express';
import prisma from './src/utils/prisma.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

function filter(obj, ...keys) {
    if (typeof obj !== 'object' || Array.isArray(obj)) {
        return {};
    }

    return keys.reduce((acc, key) => {
        if (obj.hasOwnProperty(key)) {
          acc[key] = obj[key];
        }
        return acc;
      }, {});
    }

router.post('/users', async (req, res) => {
    // Request body validation
    const { firstName, lastName, email, password } = req.body;
    if (!firstName) {
        return res.status(400).json({ error: 'First name is required' });
    }
    if (!lastName) {
        return res.status(400).json({ error: 'Last name is required' });
    }
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return res.status(400).json({ error: 'Invalid email format'})
    }

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    if (password.length < 8 ) {
        return res.status(400).json({ error: 'Password should be at least 8 characters'})
    }
    
    console.log('req.body: ', req.body)

    // Create a new user
    try {
        //check if the email is already taken
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'This email is already registered'});
        }
    
        //Generate a salt to use for password hashing
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);

        //Hash the password using the generated salt
        const hashedPassword = bcrypt.hashSync(password, salt);


        console.log("Before user creation")
        const newUser = await prisma.user.create({
            data: { firstName, lastName, email, password: hashedPassword },
        });

        // const filteredUser = filter(newUser, 'id', 'firstName', 'lastName', 'email')
        res.json(newUser);
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

router.get('/users', async (req, res) => {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    });
  
    res.json(allUsers);
  });
  

router.get('/users/:id', async (req, res) => {
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

router.put('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
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

export default router;

