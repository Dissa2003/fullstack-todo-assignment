const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 1. GET ALL: ඔක්කොම tasks ගන්න
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST: අලුත් task එකක් හදන්න
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. PUT: Title සහ Description update කරන්න
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
        res.status(400).json({ message: err.message });
    }
});

// 4. PATCH: Task එක done ද නැද්ද කියලා toggle කරන්න
router.patch('/:id/done', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: "Not found" });
        
        todo.done = !todo.done;
        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. DELETE: Task එකක් අයින් කරන්න
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Todo not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;