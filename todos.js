const {
    getTodos,
    createTodo,
    deleteTodo,
    editTodo
} = require('./todoUtils')

const express = require('express')
const router = express.Router()

router.get('/:username', getTodos)

router.post('/newtodo', createTodo)

router.delete('/delete', deleteTodo)

router.post('/edit', editTodo)



module.exports = router

