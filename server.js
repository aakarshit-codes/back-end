require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const User = require('./models/User');

const SECRET_KEY = 'your-secret-key'; 
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-00.azylm.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`
const PORT = 3000;

const app = express();
app.use(express.json());

mongoose.connect(DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

app.get('/books', authenticateToken, async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'server-error' });
    }
});
app.post('/books/', async (req, res) => {
    const new_book = new Book(req.body);

   try {
        const saved_book = await new_book.save();
        res.status(201).json(saved_book);
   } catch (error) {
        res.status(400).json({ message: 'invalid-data'});
   }
});
app.put('/books/:id', async (req, res) => {
    try {
        const update_book = await Book.findByIdAndUpdate(req.params.id, req.body, { new:true });

        if (!update_book)
            return res.status(404).json({ message : 'book-not-found' });
        res.json(update_book);
    } catch (error) {
        res.status(400).json({ message : 'invalid-data' });
    }
});
app.delete('/books/:id', async (req, res) => {
    try {
        const delete_book = await Book.findByIdAndDelete(req.params.id);

        if (!delete_book) 
            return res.status(404).json({ message : 'book-not-found'});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message : 'server-error' });
    }   
});

app.post('/register', async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message : 'user-registered' });
    } catch(error) {
        res.status(400).json({ message : 'username-already-exists'});
    }
});
app.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password)))
            return res.status(401).json({ message : 'invalid-credentails' });

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token : token });
    } catch (error) {
        res.status(500).json({ message : 'server-error'});
    }
});

function authenticateToken(req, res, next) {
    const auth_header = req.headers['authorization'];

    const token = auth_header && auth_header.split(' ')[1];
    if (!token) return res.status(403).json({ message : 'no-token-provided'});

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({ message : 'invalid-token'});
        req.user = user;
        next();
    });
}
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('something-went-wrong');
});