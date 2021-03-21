const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path')
const ObjectId = require('mongodb').ObjectId;

var db, collection;
const myUrl = "mongodb+srv://rc:rc@rc21.qlizq.mongodb.net/todo?retryWrites=true";
const url = myUrl
const dbName = "todo"; //database name that I chose from Mongo

app.listen(2000, () => {
  MongoClient.connect(
    myUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
    },
  );
});

app.set('view engine', 'ejs');
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {   //reads, picks it up from mongodb (our database) to be to displayed on ejs//
  db.collection('toDoListExpress')
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render('index.ejs', {
        listItemArray: result,
      });
    });
});

app.put('/toDoList', (req, res) => { //updates the to do list //
  const shouldUncrossout = req.body.isCrossedOut;

  db.collection('toDoListExpress').findOneAndUpdate(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        isCrossedOut: shouldUncrossout ? '' : 'crossout', //ternary operator//
        //same as
        /*
          let isCrossedOut;
          if (shouldUncrossout === true){
          isCrossedOut = ""
          }else{
          isCrossedOut = "crossout"
          }
        */
      },
    },
    {},
    (err, result) => {
      if (err) return console.log(err);
      res.redirect('/');
    },
  );
});

app.post('/toDoList', (req, res) => { //.Post request = create something//
  db.collection('toDoListExpress').insertOne(
    {
      listItem: req.body.listItem,
      isCrossedOut: '',
    },
    (err, result) => {
      if (err) return console.log(err);
      res.redirect('/');
    },
  );
});

app.delete('/toDoList', (req, res) => {
  db.collection('toDoListExpress').findOneAndDelete(
    { _id: ObjectId(req.body._id) },
    (err, result) => {
      if (err) return console.log(err);
      res.redirect('/');
    },
  );
});

app.delete('/clearAll', (req, res) => {
  db.collection('toDoListExpress').drop({}, (err, result) => {
    if (err) return console.log(err);
    res.redirect('/');
  });
});

app.delete('/clearAllCompleted', (req, res) => {
  db.collection('toDoListExpress').deleteMany(
    { isCrossedOut: 'crossout' },
    (err, result) => {
      if (err) return console.log(err);
      res.redirect('/');
    },
  );
});
