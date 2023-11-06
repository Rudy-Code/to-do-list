const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Todo = mongoose.model('Todo', todoSchema);

async function createTodo(title, category, completed = false) {
    try {
        const newTodo = new Todo({
            title,
            category,
            completed,
        });

        const createdTodo = await newTodo.save();
        return createdTodo;
    } catch (error) {
        throw error;
    }
}

async function findTodos() {
    try {
        const todos = await Todo.find();
        return todos;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTodo,
    findTodos,
};