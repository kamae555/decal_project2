import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4040;

app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema & Model
const gameSchema = new mongoose.Schema({
  date: String,
  opponent: String,
  location: String,
  result: String,
  score: String,
  memo: String,
});

const Game = mongoose.model('Game', gameSchema);

// 기본 테스트용 라우트
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Welcome to the Baseball Logs API!' });
});

// 경기 추가
app.post('/api/games', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save game data' });
  }
});

// 모든 경기 조회
app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch game data' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
