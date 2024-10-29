const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];
app.get('/books', (req, res) => {
    res.json(books);
});
app.post('/books/', (req, res) => {
    const new_book = {id: Date.now(), ...req.body};

    books.push(new_book);
    res.status(201).json(new_book);
});
app.put('/books/:id', (req, res) => {
    const book_id = parseInt(req.params.id);
    const book_in = books.findIndex(book => book.id === book_id);

    if (book_in === -1) res.status(404).send('book-not-found');

    books[book_in] = {...books[book_in], ...req.body};
    res.json(books[book_in]);
});
app.delete('/books/:id', (req, res) => {
    const book_id = parseInt(req.params.id);

    books = books.filter(book => book.id !== book_id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('something-went-wrong');
});