const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const cors = require('cors');
const app = express()

app.use(cors());

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))


function myDatabase() {
  const client = new MongoClient('mongodb://localhost:27017/interview')

  // Connect to database
  client.connect()
    .then(() => {
      console.log('Connected Successfully!')

      //Close the database connection
      console.log('Exiting..')
    })
    .catch(error => console.log('Failed to connect!', error))

  return client // Access the connected database
}




app.post('/signup', async (req, res) => {
  const { username, password, role } = req.body.data;
  console.log(username, password, role)

  try {
    // Connect to MongoDB
    const db = myDatabase().db();
    const usersCollection = db.collection('library');

 
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Create a new user document
    const newUser = {
      username,
      password,
      role,
      books: []
    };

    // Insert the new user document
    const user = await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User created successfully', user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});






app.post('/login', async (req, res) => {
  const { username, password } = req.body.data;
  // console.log(username,"kk")
  try {

    const db = myDatabase().db();
    const usersCollection = db.collection('library');
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log(password, user.password)
    if (password != user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Logged in successfully', user: user });

  } catch (error) {

  }


});
























////////////students//////////////////////////////////////


app.get('/students', async (req, res) => {
  const db = myDatabase().db();
  const usersCollection = db.collection('students'); // Access the 'users' collection
  try {

    const users = await usersCollection.find().toArray();
    res.json(users);
    // client.close()
  } catch (err) {
    console.error('Failed to fetch users.');
    res.status(500).send('Internal Server Error');
  }
});

app.get('/students/:id', async (req, res) => {
  // const userId = req.params.id;
  let userId = new ObjectId(req.params.id);
  const db = myDatabase().db();
  const usersCollection = db.collection('library'); // Access the 'users' collection
  try {
    console.log("iiiiii", userId)
    const users = await usersCollection.findOne({ _id: userId })
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users.');
    res.status(500).send('Internal Server Error');
  }
});

app.post('/students/:id', async (req, res) => {
  const db = myDatabase().db();
  const usersCollection = db.collection('library'); // Access the 'users' collection
  let userId = new ObjectId(req.params.id);// Assuming the user ID is provided as a route parameter
  const newValue = req.body.book;
  console.log(newValue)
  try {

    const users = await usersCollection.updateOne({ _id: userId },
      { $push: { books: newValue } })
    res.json(users);
    //  client.close()
  } catch (err) {
    console.error('Failed to fetch users.');
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/students/:id/:value', async (req, res) => {
  const db = myDatabase().db();
  const usersCollection = db.collection('library'); // Access the 'users' collection
  let userId = new ObjectId(req.params.id); // Assuming the user ID is provided as a route parameter
  const valueToDelete = req.params.value;
  try {

    const users = await usersCollection.updateOne({ _id: userId }, { $pull: { books: valueToDelete } })
    res.json(users);
    //  client.close()
  } catch (err) {
    console.error('Failed to fetch users.');
    res.status(500).send('Internal Server Error');
  }
});


app.listen(4000, (res) => {
  console.log('Listening on port 4000')
})


