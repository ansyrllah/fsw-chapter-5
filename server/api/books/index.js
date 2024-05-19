const books = [
    {
        id: 0,
        title: 'Buku Harmony',
        isbn: 123456789,
        price: 20500,
        author: 'Qlippoth',
    },
    {
        id: 1,
        title: 'Buku Tulis',
        isbn: 111456789,
        price: 20200,
        author: 'Qlippoth',
    },
    {
        id: 2,
        title: 'Buku Bacaan',
        isbn: 1111456789,
        price: 24000,
        author: 'Qlippoth',
    },
];

function getBooks(req, res) {
    let result;
    const { q } = req.query;
    
    if (!q) {
        return res.status(200).json(books);
    }

    result = books.find((el) => el.title === q);
    return res.status(200).json(result);
}

function getBookById(req, res) {
    const { id } = req.params;
    //  console.log(id + typeof(id)); // debug
    let result = books.find((el) => el.id === parseInt(id));
    return res.status(200).json(result);
}

function addBook(req, res) {
    if (!req.body) {
        return res.status(400).send('Invalid request');
    }
    books.push(req.body);
    return res.status(201).send('Berhasil menambahkan buku!');
}

// to-do
function deleteBookById(req, res) {
    const { id } = req.params;
    const index = books.indexOf(id);
    if (index > -1) {
        books.splice(index, 1);
        return res.status(201).send(`Berhasil mengahapus buku id: ${id}`);
    }
   //  let result = books.find((el) => el.id === parseInt(id));
}

function updateBook(req, res) {}

module.exports = {
    getBookById,
    getBooks,
    addBook,
    deleteBookById,
};
