const express = require('express')
const app = express()
const bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

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

Reviews.find()
.then(review => {
    // Code in here is executed when the promise resolves
})
.catch(err => {
    // executed if the promise is rejected
});

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
  })

app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
  });

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

