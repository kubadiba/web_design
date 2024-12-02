const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

let cart = [];
// Дані каталогу (перемістити визначення на початок!)
const fallbackData = [
    {
        id: '1',
        title: "Mystery of the Lost City",
        description: "Explore the ancient ruins of a forgotten city...",
        author: "Agatha Christie",
        genre: "Detective",
        price: 45.00,
        image: "/images/image4.png",
        countableField: 30,
        selectableField: ["Ukrainian", "English", "Chinese", "Polish", "Spanish", "French"],
    },
    {
        id: '2',
        title: "Beyond the Stars",
        description: "Venture beyond the known universe in this science fiction epic...",
        author: "Frank Herbert",
        genre: "Science",
        price: 50.00,
        image: "/images/image5.png",
        countableField: 30,
        selectableField: ["Ukrainian", "English", "Chinese", "Polish", "Spanish", "French"],
    },
    {
        id: '3',
        title: "Whispers of the Past",
        description: "Dive into a world of history and mystery...",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: 40.00,
        image: "/images/image6.png",
        countableField: 30,
        selectableField: ["Ukrainian", "English", "Chinese", "Polish", "Spanish", "French"],
    },
];

// Завантаження вмісту кошика з файлу при старті сервера
const loadCartFromFile = () => {
    try {
        const data = fs.readFileSync('cart.json', 'utf8');
        cart = JSON.parse(data);
    } catch (error) {
        console.error('Error loading cart from file:', error);
        cart = [];
    }
};

const saveCartToFile = () => {
    try {
        fs.writeFileSync('cart.json', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to file:', error);
    }
};

loadCartFromFile();

const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));

// Роут для отримання каталогу
app.get('/catalog', (req, res) => {
    const { search, author, genre } = req.query;
    let filteredItems = fallbackData;

    if (search) {
        filteredItems = filteredItems.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (author && author !== 'All') {
        filteredItems = filteredItems.filter(item => item.author === author);
    }

    if (genre && genre !== 'All') {
        filteredItems = filteredItems.filter(item => item.genre === genre);
    }

    res.json(filteredItems);
});

// Роут для отримання товару за ID
app.get('/catalog/:id', (req, res) => {
    const { id } = req.params;
    const product = fallbackData.find(item => item.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// Роут для отримання вмісту кошика
app.get('/cart', (req, res) => {
    res.json(cart);
});

app.post('/cart', (req, res) => {
    const { id, quantity, language } = req.body;

    const product = fallbackData.find((item) => item.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const existingItem = cart.find((item) => item.id === id && item.language === language);

    if (quantity === 0) {
        cart = cart.filter((item) => !(item.id === id && item.language === language));
    } else if (existingItem) {
        existingItem.quantity = quantity;
    } else {
        cart.push({ ...product, quantity, language });
    }

    saveCartToFile();
    res.json(cart);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.post('/cart/clear', (req, res) => {
    cart = []; // Очищення кошика
    saveCartToFile(); // Збереження порожнього кошика в файл
    res.json({ message: 'Cart cleared successfully' });
});


