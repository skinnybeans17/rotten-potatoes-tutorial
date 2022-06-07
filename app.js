const express = require('express')
const methodOverride = require('method-override')

const app = express()

var exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//var reviews = [
    //{ title: "Great Review", movieTitle: "Batman II" },
    //{ title: "Awesome Movie", movieTitle: "Titanic" }
//]
  
const Review = require('./models/review')
const Comment = require('./models/comment')

const reviews = require('./controllers/reviews')(app, Review);
const comments = require('./controllers/comments')(app, Comment);

module.exports = app;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

//const port = process.env.PORT || 3000;
//app.listen(port);

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})