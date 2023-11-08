const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        default: false,
    },
});

const Todo = mongoose.model('Todo', todoSchema);

async function createTodo( id, name, done = false, category ) {
    try {
        const newTodo = new Todo({
            id, 
            name, 
            done, 
            category,
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