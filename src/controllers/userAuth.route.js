// // import express from 'express';
// // import prisma from "../utils/prisma.js";
// // import bcrypt from 'bcryptjs';
// // import { signAccessToken } from '../utils/jwt.js';
// // import { filter } from "../utils/common.js";
// // import { validateUser } from '../validators/users.js';

// // const loginRoute = express.Router();

// // loginRoute.post('/login', async (req, res) => {
// //     const data = req.body;
// //     const validationErrors = validateUser(data);
    
// //     console.log(validationErrors)
   
// //    if (Object.keys(validationErrors).length !== 0) return res.status(400).send({
// //        error: validationErrors
// //    })


// //    const { firstName, lastName, email, password } = req.body;

    
// //     try {
// //         //Retrieve user record based on the submitted email
// //         const user = await prisma.user.findUnique({ where: { email: email }});
        
// //         if (!user) {
// //             return res.status(401).json({ error: 'Invalid credentials' });
// //         }
        
// //         //Compare the submitted password with the stored password
        
// //         const checkPassword = bcrypt.compareSync(password, user.password)
// //         if (!checkPassword) {
// //             return res.status(401).json({ error: 'Invalid credentials'});
// //         }
        
// //         const filteredUser= filter(user, 'id', 'firstName', 'lastName', 'email');
// //         const accessToken = await signAccessToken(filteredUser);
// //         return res.json({ accessToken });
// //         } catch (error) {
// //         console.error('Error during login:', error);
// //         return res.status(500).json({ error: 'Server error' });
// //     }
// // });
 
// // export default loginRoute;

// import express from 'express';
// import prisma from "../utils/prisma.js";
// import bcrypt from 'bcryptjs';
// import { signAccessToken } from '../utils/jwt.js';
// import { filter } from "../utils/common.js";
// import { validateUser } from '../validators/users.js';

// const loginRoute = express.Router();
// loginRoute.post('/login', async (req, res) => {
//     const data = req.body
  
//     const validationErrors = validateUser(data)
  
//     if (Object.keys(validationErrors).length != 0) return res.status(400).send({
//       error: validationErrors
//     })
  
//     data.password = bcrypt.hashSync(data.password, 8);
  
//     prisma.user.create({
//       data
//     }).then(user => {
//       return res.json(filter(user, 'id', 'name', 'email'))
  
//     }).catch(err => {
//       if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
//         const formattedError = {}
//         formattedError[`${err.meta.target[0]}`] = 'already taken'
  
//         return res.status(500).send({
//           error: formattedError
//         })
//       }
//       throw err
//     })
//   })
  
//   export default loginRoute

import express from 'express';
import prisma from "../utils/prisma.js";
import bcrypt from 'bcryptjs';
import { signAccessToken } from '../utils/jwt.js';
import { filter } from "../utils/common.js";
import { validateUser } from '../validators/users.js';

const loginRoute = express.Router();

loginRoute.post('/login', async (req, res) => {
    const data = req.body;
    // const validationErrors = validateUser(data);
    
    // if (Object.keys(validationErrors).length !== 0) {
    //     return res.status(400).send({
    //         error: validationErrors
    //     });
    // }

    const { email, password } = data;
    
    try {
        // Retrieve user record based on the submitted email
        const user = await prisma.user.findUnique({ where: { email: email }});

        //check if user exists
        if (!user) {
            return res.status(401).json({ error: 'User does not exist' });
        }

        if (!user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return res.status(400).json({ error: 'Invalid email format' })
          }

        // Compare the submitted password with the stored password
        const passwordMatch = bcrypt.compareSync(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // User login successful, generate access token
        const filteredUser = filter(user, 'id', 'firstName', 'lastName', 'email');
        const accessToken = await signAccessToken(filteredUser);
        
        return res.json({ user: filteredUser, accessToken });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

export default loginRoute;
