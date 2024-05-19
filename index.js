const { urlencoded } = require('body-parser');
const express = require('express');
const {getBookById, getBooks, addBook, deleteBookById} = require('./server/api/books')
const app = express();

const PORT = process.env.PORT || 8000;

// parsing data encoded
// app.use(urlencoded())
// parsing data json
app.use(express.json());

// routing
app.get('/', (req, res) => {
    res.send('Welcome to library');
});
app.get('/about', (req, res) => {
    res.send(`<h1>Selamat datang di halaman about<h1>`);
});

// routing dengan function handler
app.get('/home', hanlderHome);
function hanlderHome(req, res) {
    res.send('Halaman home pake function handler');
}

// routing yang dapet inputan dari user dari link
// query
// data query bersifat optional
app.get("/search", (req, res) => {
    const { keyword, sort } = req.query;
    res.send(`Pencarian ${keyword} dengan urutan secara ${sort}`);
});

// params (path parameters)
// parameter dianggap sebagai url. kalo ga sesuai maka 404 page. jadi mandatory
// ga cocok untuk kirim data kompleks
// app.get('/:name', (req, res) => {
//     const { name } = req.params; //cara destruction
//     //  const name = req.params.name; // cara biasa
//     // res.send(req.params) // cara liat isi params
//     res.send('Hallo ' + name);
// });
app.get('/:name/:age', (req, res) => {
    const { name, age } = req.params; //cara destruction
    //  const name = req.params.name; // cara biasa
    res.send('Hallo ' + name + ' Selamat ulang tahun yang ke-' + age);
    // res.send(req.params) // cara liat isi params
});

// request body dengan POST, PUT, PATCH
app.post("/register", (req, res) => {
   console.log(req.body);
   res.status(201).send("Berhasil terdaftar")
})

// routing books
app.get('/api/v1/books', getBooks)
app.get('/api/v1/books/:id', getBookById)
app.post('/api/v1/books', addBook)
app.delete('/api/v1/books/:id', deleteBookById)

app.listen(PORT, () => {
    console.log(`Express udah jalan di http://localhost:${PORT}`);
});
