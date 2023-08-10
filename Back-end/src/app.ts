import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
import cors, { CorsOptions } from 'cors';
import Settings from './shared/utils/settings';


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

//CORS middleware
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
// app.use(cors())


// app.use(
//   cors(function (req, callback) {
//     let corsOptions: CorsOptions
//     if (
//       Settings.ALLOWED_ORIGINS.indexOf(req.header('Origin') as string) !==
//         -1 ||
//       Settings.ALLOWED_ORIGINS === '*'
//     ) {
//       corsOptions = { origin: true, credentials: true }
//     } else {
//       corsOptions = { origin: false }
//     }
//     callback(null, corsOptions)
//   })
// )

// Middleware
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/jobs', jobRoutes);
app.use('/api/jobs', jobRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
