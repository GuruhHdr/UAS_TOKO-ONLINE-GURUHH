const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products (API)
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});

// Create new product (API)
router.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Error creating product', error: err.message });
    }
});

// Get all products
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.render('index', { products });
    } catch (err) {
        next(err);
    }
});

// New product form
router.get('/new', (req, res) => {
    res.render('new');
});

// Create new product
router.post('/', async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

// Show product details
router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('show', { product });
    } catch (err) {
        next(err);
    }
});

// Edit product form
router.get('/:id/edit', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('edit', { product });
    } catch (err) {
        next(err);
    }
});

// Update product
router.put('/:id', async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

// Delete product
router.delete('/:id', async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
