const { update } = require('@microsoft/sp-lodash-subset')
const { ObjectId } = require('mongodb')
const client = require('./connect')

const todos = client.db('inko').collection('todos')

const getTodos = async (req, res) => {
    const username = req.params.username

    console.log(username)
    const result = await todos.find({
        username: {
            $eq: username.slice(1)
        }
    }).toArray()

    console.log(result)

    res.status(200).json(result)
}

const createTodo = async (req, res) => {
    const reqBody = req.body
    const username = reqBody.username
    const title = reqBody.title
    const todobody = reqBody.todobody
    var currentdate = new Date(); 
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    console.log(datetime)

    const newTodo = {
        username: username,
        title: title,
        todobody: todobody,
        dateTime: datetime
    }

    todos.insertOne(newTodo).then((doc) => {
        console.log(doc)
        console.log("inserted successfully")
        res.status(200).json({
            message: 'new todo added successfully.'
        })
    }).catch((err) => {
        res.status(401).json({
            message: err
        })
    })
}

const deleteTodo = (req, res) => {
    const reqBody = req.body
    const id = reqBody.id

    todos.deleteOne({
        _id: new ObjectId(id)
    }).then((doc) => {
        console.log('deleted the todo successfully')
        res.status(200).json({
            message: 'deleted the todo successfully'
        })
    }).catch((err) => {
        res.status(401).json({
            message: 'sorry there was an error'
        })
    })
}

const editTodo = (req, res) => {
    const reqBody = req.body
    const id = reqBody.id
    const updateDoc = reqBody.updateDoc

    todos.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: updateDoc
    }).then((doc) => {
        res.status(200).json({
            message: 'todo updated successfully.'
        })
    }).catch((err) => {
        res.status(401).json({
            error: err
        })
    })
}

module.exports = {
    getTodos,
    createTodo,
    deleteTodo,
    editTodo
}