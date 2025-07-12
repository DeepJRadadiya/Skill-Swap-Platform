const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db'); // Your db.js file
const User = require('./models/User'); 
const authRouter = require('./routes/auth-route');    // Your User model
const skilRouter = require('./routes/skill-route');    // Your User model

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
  credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('✅ Skill Swap API is running');
});
app.get('/seed', async (req, res) => {
  try {
    const dummyUser = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword123", // In production, hash this!
      location: "New York",
      profile_photo: "https://example.com/profile.jpg",
      availability: "Weekends",
      is_public: true,
      is_admin: false,
      rating: 4.5
    });

    await dummyUser.save();
    res.status(201).json({ message: "Dummy user created", user: dummyUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Create a new user
// app.post('/users', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json({ message: 'User created successfully', user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.use('/api/auth', authRouter);
app.use('/api/skill', skilRouter);

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
});
