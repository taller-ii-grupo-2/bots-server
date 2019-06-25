const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()

// set the port of our application
// // process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// connect to Mongo daemon
// mongoose
//   .connect(
//       process.env.DATABASE_URL,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
         mongoose.connection.once('open', function(){
         console.log('Conection has been made!');
             }).on('error', function(error){
          console.log('Error is: ', error);
           });

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian from heroku' });
kitty.save().then(() => console.log('meow'));


app.set('view engine', 'ejs');

// from here on it works!
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) =>{
    res.render("index");   
})


app.get('/', (req, res) => res.send('Live modifiable now? Huh, amazing! Hello World! This time, from a NODE server! Now even from docker!!! wooooaa'))

app.get('/tito', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
  })
});

app.post('/tito', (req, res) => {
  const help_text = "my help text"
  console.log('in /tito');
  let arg = req.body.arg;
  if (arg == 'help'){
    res.status(200).send(help_text);
  } else if (arg == 'info'){
    console.log('in info');
  } else if (arg.split(' ')[0] == 'mute'){
    console.log('in mute');
    let seconds = Number(arg.split(' ')[1]);
    console.log('users wants to be muted for ' + seconds + ' seconds');
  } else if (arg == 'me'){
    console.log('in me');
  }

  res.status(200).end()
});


app.listen(port, () => {console.log(`Example app listening on port ${port}!`)})
