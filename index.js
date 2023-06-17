import express from "express";
import routes from './routes.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json()); // allows handling of json payloads in routes

app.use('/api', routes);

app.listen(port, () => {
    console.log(`App started; listening on port ${port}`)
});


// app.post('/api/users', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const newUser = await prisma.user.create({
//             data: {
//                 name,
//                 email,
//                 password,
//             },
//         });

//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// });

// app.get('/api/users', async (req, res) => {
//     const allUsers = await prisma.user.findMany()
//     res.json(allUsers)
// })

// app.get('/api/users/:id', async (req, res) => {
//     const userId = req.params.id;
//     const user = await prisma.user.findUnique({
//         where: { id: userId },
//     });
//     console.log('user: ', user);
//     res.json(user);
// });

// app.put('/api/users/:id', async (req, res) => {
//     const userId = req.params.id;
//     const { name, email, password } = req.body;

//     try {
//         const updateUser = await prisma.user.update({
//             where: { id: userId },
//             data: {
//                 name,
//                 email,
//                 password,
//             },
//         });

//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to update user' });
//     }
// });