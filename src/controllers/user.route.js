// // import express from 'express';
// // import prisma from "../utils/prisma.js";
// // import bcrypt from 'bcryptjs';
// // import { validateUser } from '../validators/users.js';
// // const { PrismaClientKnownRequestError } = prisma;

// // const userRoute = express.Router();

// // userRoute.post('/users', async (req, res) => {
// //     const data = req.body;
// //     const validationErrors = validateUser(data);
    
// //     if (Object.keys(validationErrors).length != 0) {
// //         return res.status(400).send({
// //             error: validationErrors
// //         });
// //     }
// //     const { firstName, lastName, email, password } = data;
    
// //     // Create a new user
// //     try {
// //         //check if the email is already taken
// //         const existingUser = await prisma.user.findUnique({
// //             where: { email: email }});
    
// //         //Generate a salt to use for password hashing
// //         const saltRounds = 10;
// //         const salt = bcrypt.genSaltSync(saltRounds);

// //         //Hash the password using the generated salt
// //         const hashedPassword = bcrypt.hashSync(password, salt);

// //         const newUser = await prisma.user.create({
// //             data: { firstName, lastName, email, password: hashedPassword }});

// //         // const filteredUser = filter(newUser, 'id', 'firstName', 'lastName', 'email')
// //         res.json(newUser);

        
// //     } catch (err) {
// //             if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
// //                 const formattedError = {}
// //                 formattedError[`${err.meta.target[0]}`] = 'already taken'

// //                 return res.status(500).send({
// //                     error: formattedError
// //                 })
// //             }
// //             throw err
// //         }
// // })

// // userRoute.get('/users', async (req, res) => {
// //     const allUsers = await prisma.user.findMany({
// //         select: {
// //             id: true,
// //             firstName: true,
// //             lastName: true,
// //             email: true
// //         }
// //     });
    
// //     res.json(allUsers);
// // });

// // export default userRoute;

// // // import express from 'express';
// // // import prisma from "../utils/prisma.js";
// // // import bcrypt from 'bcryptjs';
// // // import { signAccessToken } from '../utils/jwt.js';
// // // import { filter } from "../utils/common.js";
// // // import { validateUser } from '../validators/users.js';

// // // const loginRoute = express.Router();

// // // loginRoute.post('/login', async (req, res) => {
// // //     const data = req.body;
// // //     const validationErrors = validateUser(data);
    
// // //     console.log(validationErrors)
   
// // //    if (Object.keys(validationErrors).length !== 0) return res.status(400).send({
// // //        error: validationErrors
// // //    })


// // //    const { firstName, lastName, email, password } = req.body;

    
// // //     try {
// // //         //Retrieve user record based on the submitted email
// // //         const user = await prisma.user.findUnique({ where: { email: email }});
        
// // //         if (!user) {
// // //             return res.status(401).json({ error: 'Invalid credentials' });
// // //         }
        
// // //         //Compare the submitted password with the stored password
        
// // //         const checkPassword = bcrypt.compareSync(password, user.password)
// // //         if (!checkPassword) {
// // //             return res.status(401).json({ error: 'Invalid credentials'});
// // //         }
        
// // //         const filteredUser= filter(user, 'id', 'firstName', 'lastName', 'email');
// // //         const accessToken = await signAccessToken(filteredUser);
// // //         return res.json({ accessToken });
// // //         } catch (error) {
// // //         console.error('Error during login:', error);
// // //         return res.status(500).json({ error: 'Server error' });
// // //     }
// // // });
 
// // // export default loginRoute;

// // import express from 'express';
// // import prisma from "../utils/prisma.js";
// // import bcrypt from 'bcryptjs';
// // import { signAccessToken } from '../utils/jwt.js';
// // import { filter } from "../utils/common.js";
// // import { validateUser } from '../validators/users.js';

// // const loginRoute = express.Router();
// // loginRoute.post('/login', async (req, res) => {
// //     const data = req.body
  
// //     const validationErrors = validateUser(data)
  
// //     if (Object.keys(validationErrors).length != 0) return res.status(400).send({
// //       error: validationErrors
// //     })
  
// //     data.password = bcrypt.hashSync(data.password, 8);
  
// //     prisma.user.create({
// //       data
// //     }).then(user => {
// //       return res.json(filter(user, 'id', 'name', 'email'))
  
// //     }).catch(err => {
// //       if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
// //         const formattedError = {}
// //         formattedError[`${err.meta.target[0]}`] = 'already taken'
  
// //         return res.status(500).send({
// //           error: formattedError
// //         })
// //       }
// //       throw err
// //     })
// //   })
  
// //   export default loginRoute

// import express from 'express';
// import prisma from "../utils/prisma.js";
// import bcrypt from 'bcryptjs';
// import { signAccessToken } from '../utils/jwt.js';
// import { filter } from "../utils/common.js";
// import { validateUser } from '../validators/users.js';

// const loginRoute = express.Router();

// loginRoute.post('/users', async (req, res) => {
//     const data = req.body;
//     const validationErrors = validateUser(data);
    
//     if (Object.keys(validationErrors).length !== 0) {
//         return res.status(400).send({
//             error: validationErrors
//         });
//     }

//     const { firstName, lastName, email, password } = data;
    
//     try {
//         // Retrieve user record based on the submitted email
//         const user = await prisma.user.findUnique({ where: { email: email }});
        
//         // User login successful, generate access token
//         const filteredUser = filter(user, 'id', 'firstName', 'lastName', 'email');
//         const accessToken = await signAccessToken(filteredUser);
        
//         return res.json({ accessToken });
//     } catch (error) {
//         console.error('Error during login:', error);
//         return res.status(500).json({ error: 'Server error' });
//     }
// });

// export default loginRoute;


import express from 'express';
import prisma from "../utils/prisma.js";
import bcrypt from 'bcryptjs';
import { signAccessToken } from '../utils/jwt.js';
import { filter } from "../utils/common.js";
import { validateUser } from '../validators/users.js';

const userRoute = express.Router();

userRoute.post('/users', async (req, res) => {
    const data = req.body;
    const validationErrors = validateUser(data);

    if (Object.keys(validationErrors).length !== 0) {
        return res.status(400).send({
            error: validationErrors
        });
    }

    const { firstName, lastName, email, password } = data;

    try {
        // Check if user with the same email already exists
        const existingUser = await prisma.user.findUnique({ where: { email: email } });

        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create the new user
        const user = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            }
        });

        // Generate access token for the new user
        const filteredUser = filter(user, 'id', 'firstName', 'lastName', 'email');
        const accessToken = await signAccessToken(filteredUser);

        return res.json({ id: user.id, firstName, lastName, email, accessToken });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

userRoute.get('/users', async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await prisma.user.findMany();

        // Filter the user data
        const filteredUsers = users.map(user => filter(user, 'id', 'firstName', 'lastName', 'email'));

        return res.json(filteredUsers);
    } catch (error) {
        console.error('Error retrieving users:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

export default userRoute;
