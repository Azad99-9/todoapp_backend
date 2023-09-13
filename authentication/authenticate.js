const client = require('../connect')

const users = client.db('inko').collection('users')

const signin = async (req, res) => {
    const credentials = req.body;
    const username = credentials.username;
    const password = credentials.password;
  
    const query = {
      username: username
    };
  
    const user = await users.findOne(query); // Use findOne() to get a single document
    if (!user) {
      res.status(404).json({
        message: 'User not found.'
      });
    } else {
      if (user.password === password) {
        res.status(200).json({
          message: 'User logged in successfully'
        });
      } else {
        res.status(401).json({
          message: 'Wrong password'
        });
      }
    }
  }

  const signup = async (req, res) => {
    const credentials = req.body;
    const username = credentials.username;
    const password = credentials.password;
    const email = credentials.email;
  
    const existingUser = await users.findOne({ username: username });
    if (existingUser) {
      res.status(401).json({
        message: 'User already exists.'
      });
    } else {
      const emailPattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  
      if (!emailPattern.test(email)) {
        res.status(401).json({
          message: 'Enter a valid email'
        });
      } else {
        const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPassword.test(password)) {
          res.status(401).json({
            message: 'Enter a strong password'
          });
        } else {
          await users.insertOne(req.body);
          console.log('User created successfully.');
          res.status(201).json({
            message: 'User created successfully'
          });
        }
      }
    }
  }

  module.exports = {
    signin,
    signup
  }

