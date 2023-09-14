// const {MongoClient} = require('mongodb')
// const uri = require('./atlas_uri')

// console.log(uri)

// const client = new MongoClient(uri)
// const dbname = 'bank'
// const collection_name = 'accounts'

// const accountCollection = client.db(dbname).collection(collection_name)

// const connectToDatabase = async() => {
//     try {
//         await client.connect()
//         let result = await accountCollection.insertMany(sampleAccounts)
//         console.log(result)
//         console.log('connected successfully')
//     } catch (err) {
//         console.error(`Error connecting to database ${err}`)
//     }
// }



// const main = async () => {          
//     try {
//         await connectToDatabase();
//     } catch (err) {
//         console.error(`Error connecting to database: ${err}`)
//     } finally {
//         await client.close()
//     }
// }

// main()

const express = require('express')
const app = express();
const todos = require('./todos.js')
const {
  signin,
  signup
} = require('./authentication/authenticate')
const serverless = require('serverless-http')


app.use(express.json());
app.use('/api/inko/todos', todos)

// login route
app.post('/api/inko/login', signin);

// signup route
app.post('/api/inko/signup', signup);

// listen
// app.listen(5000, () => {
//     console.log('server started')
// })

app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)