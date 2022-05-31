const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//var reviews = [
//    { title: "Great Review", movieTitle: "Batman II" },
//    { title: "Awesome Movie", movieTitle: "Titanic" }
//]
  
app.get('/', (req, res) => {
res.render('reviews-index', { reviews: reviews });
})

app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
      })
      .catch(err => {
        console.log(err);
      })
  })

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String
  });

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

