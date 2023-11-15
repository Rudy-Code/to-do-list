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

const createTodo = async (id, name, done = false, category) => {
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

const findTodos = async () => {
    try {
        const todos = await Todo.find();
        return todos;
    } catch (error) {
        throw error;
    }
}

const updateTodoIds = async (updatedTodos) => {
    try {
      for (const updatedTodo of updatedTodos) {
        const todo = await Todo.findOne({ id: updatedTodo.id });
  
        if (todo) {
          todo.id = updatedTodo.id - 1;
  
          await todo.save();
        }
      }
  
      console.log('Todo ids updated successfully');
    } catch (error) {
      console.error('Error updating todo ids:', error);
    }
  };



const deleteTodo = async (taskId) => {
    try {
        const result = await Todo.deleteOne({ id: taskId });
        if (result.deletedCount === 1) {
            console.log('Todo deleted successfully');
            return true;
        } else {
            console.log('Todo not found or could not be deleted');
            return false;
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        return false;
    }
};


module.exports = {
    createTodo,
    findTodos,
    updateTodoIds,
    deleteTodo,
};