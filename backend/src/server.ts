import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from './models/user.model';
import cors from 'cors'
import verifyToken from './middlewares/auth';
import Task, { ITask } from './models/task.model';

const app: Application = express();
const PORT = 5000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Connessione al database MongoDB
mongoose.connect('mongodb://localhost:27017/trident');

app.use(cookieParser());

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Registrazione utente
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password, dateOfBirth } = req.body;

    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'L\'utente esiste già' });
    }

    const newUser: IUser = new User({
      name,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
      dateOfBirth
    });

    await newUser.save();

    const token: string = jwt.sign({ userId: newUser._id }, 'secret');

    res.cookie('access_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Registrazione avvenuta con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
});

// Login utente
app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenziali non valide' });
    }

    const token: string = jwt.sign({ userId: user._id }, 'secret');

    res.cookie('access_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    
    res.status(200).json({ message: 'Accesso avvenuto con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante l\'accesso' });
  }
});

// Logout utente
app.post('/api/logout', async (req: Request, res: Response) => {
  try {
    res.clearCookie('access_token');
    console.log('logout')
    res.status(200).json({ message: 'Logout avvenuto con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il logout' });
  }
});

// Inserisce un nuovo task
app.post('/api/insert-task', verifyToken, async (req: Request, res: Response) => {
  const { taskName, date } = req.body;
  const user_id = req.cookies.userId;
  try {
    const task: ITask = new Task({
      user_id,
      taskName,
      date
    });

    await task.save();

    return res.status(201).json({ message: 'Task creato con successo!', task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Errore durante la creazione del task' });
  }
});

// Recupera tutti i task dell'utente
app.get('/api/task', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.cookies.userId;
    const tasks = await Task.find({user_id: userId});
    res.json({
        tasks: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Errore durante il recupero dei task' });
  }
});

