const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path')


var db, collection;
const myUrl = "mongodb+srv://rc:rc@rc21.qlizq.mongodb.net/todo?retryWrites=true";
const url = myUrl
const dbName = "todo"; //database name that I chose from Mongo

app.listen(2000, () => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))
//https://stackoverflow.com/questions/48778619/node-express-refused-to-apply-style-because-its-mime-type-text-html//

app.get('/', (req, res) => {
  db.collection('toDoListExpress').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {
      listItemArray: result
    }) //this is where it is being served//
    console.log("result", result)
  })
})

app.put('/toDoList', (req, res) => {
  db.collection('toDoListExpress')
    .findOneAndUpdate({
      _id: req.body._id
    }, {
      $set: {
        isCrossedOut: "crossout"
      }
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
})


app.post('/toDoList', (req, res) => {
  db.collection('toDoListExpress').insertOne({
    listItem: req.body.listItem,
    isCrossedOut: ""
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


//
//
app.delete('/toDoList', (req, res) => {
  db.collection('toDoListExpress').findOneAndDelete({
    listItem: req.body.listItem
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
