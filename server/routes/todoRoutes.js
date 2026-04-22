const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    try {
      
        const todos = await Todo.find().sort({ createdAt: -1 }); 
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "Server error occurred", error: err.message });
    }
});


router.post('/', async (req, res) => {
    const { title, description } = req.body;
    
    
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const newTodo = new Todo({
            title,
            description,
            done: false // Default ලෙස done status එක false වේ [cite: 38]
        });
        
        const savedTodo = await newTodo.save(); // MongoDB එකේ save කිරීම [cite: 50]
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: "Error saving TODO", error: err.message });
    }
});

module.exports = router;