import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://parthasarathiv777:parthasarathiv777@cluster0.ijw27.mongodb.net/learnHub?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Count schema to store total, placed, and unplaced counts
const countSchema = new mongoose.Schema({
  total: { type: Number, required: true },
  placed: { type: Number, required: true },
  unplaced: { type: Number, required: true },
});

const Count = mongoose.model('Count', countSchema);

// User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  course: { type: String, required: true },
  status: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Function to update counts in the Count collection
const updateCounts = async () => {
  const total = await User.countDocuments();
  const placed = await User.countDocuments({ status: 'Placed' });
  const unplaced = await User.countDocuments({ status: 'Unplaced' });

  await Count.findOneAndUpdate(
    {},
    { total, placed, unplaced },
    { upsert: true }
  );
};

// Routes
app.post('/api/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  await updateCounts();  // Update counts after adding a user
  res.send(newUser);
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await updateCounts();  // Update counts after deleting a user
  res.send({ message: 'User deleted' });
});

// Route to get current counts
app.get('/api/count', async (req, res) => {
  const countData = await Count.findOne();
  res.send(countData);
});

app.listen(5000, () => console.log('Server running on port 5000'));
