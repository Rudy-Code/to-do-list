const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');
const { createTodo, findTodos } = require('./schemas/todo.js');

require('dotenv').config()

const app = express();

app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);


// Fetch to-dos
app.get('/todos', async (req, res) => {
  try {
    const todos = await findTodos(); 
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching to-do items' });
  }
});

// Handle to-do creation
app.post('/', async (req, res) => {
    try {
      const { id, name, done, category } = req.body;
  
      const createdTodo = await createTodo( id, name, done, category );
  
      res.status(201).json(createdTodo);
    } catch (error) {
      res.status(500).json({ error: 'Error creating to-do' });
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/login.html'))
})


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})