const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 1. GET ALL TODOS
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 }); 
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "Server error occurred", error: err.message });
    }
});

// 2. CREATE A TODO
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    try {
        const newTodo = new Todo({ title, description, done: false });
        const savedTodo = await newTodo.save(); // Persist in MongoDB [cite: 50]
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: "Error saving TODO", error: err.message });
    }
});

// 3. EDIT A TODO (Title/Description)
router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description } },
            { new: true, runValidators: true }
        );
        if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: "Update failed", error: err.message });
    }
});

// 4. MARK AS DONE (Toggle status)
router.patch('/:id/done', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        todo.done = !todo.done; 
        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: "Toggle failed", error: err.message });
    }
});

// 5. DELETE A TODO
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Todo not found" });
        res.status(200).json({ message: "TODO deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Delete failed", error: err.message });
    }
});

module.exports = router;