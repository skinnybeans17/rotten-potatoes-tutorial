const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()

var exphbs = require('express-handlebars');

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//var reviews = [
//    { title: "Great Review", movieTitle: "Batman II" },
//    { title: "Awesome Movie", movieTitle: "Titanic" }
//]
  
const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
  });

const reviews = require('./controllers/reviews')(app);

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
    res.render('reviews-new', {title: "New Review"});
})

app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review)
        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
        console.log(err.message)
    })
})

app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/reviews/${review._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
      res.render('reviews-edit', {review: review, title: "Edit Review"});
    })
})

app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

