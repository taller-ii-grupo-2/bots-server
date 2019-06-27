const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const request = require('request');

const app = express()

// set the port of our application
// // process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;

//const server_url = 'http://192.168.100.106:5000';
const server_url = 'https://hypechatgrupo2-app-server-stag.herokuapp.com/';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// connect to Mongo daemon
console.log(process.env.DATABASE_URL);
console.log("no see database url above? Somethings wrong...");
mongoose
  .connect(
      process.env.DATABASE_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// My Schemas
var userSchema = new mongoose.Schema({
  mail: String,
  time_till_end_of_mute: Number
});

var User = mongoose.model('User', UserSchema);

function setMuteTime(mail, seconds){
  let d = new Date();
  time_till_end_of_mute = Math.floor(d.getTime()/1000) + seconds;
  var a_user = new User({mail:mail, timestamp_till_end_of_mute: time_till_end_of_mute})
}

// HTTP request functions
function get_to_server(endpoint, callback){
  url = String(server_url + endpoint);
  request.get(
       url,
       function (error, response, body) {
         console.log(response.statusCode); // 200
         console.log(response.headers['content-type']); // 'image/png'
         console.log(response.body); // 'image/png'
         callback(response.body);
       });
}

function post_to_server(endpoint, callback){
  url = String(server_url + endpoint);
  request.post(
      url,
      { json: { key: 'value' } },
      function (error, response, body) {
         console.log(response.statusCode); // 200
         console.log(response.headers['content-type']); // 'image/png'
         console.log(response.body); // 'image/png'
         callback(response.body);
      });
}

app.use(bodyParser.urlencoded({ extended: false }));

// My Endpoints.
app.get('/', (req, res) =>{
//    console.log(get_to_server('/android'))
  get_to_server('/android', function(response){
    res.status(200).send(response);
  });
})

app.post('/', (req, res) =>{
  post_to_server('', function(response){
    res.status(200).send(response);
  });
})

app.get('/get_db', (req, res) =>{
  var User = mongoose.model('User', UserSchema);
//  User.find
  res.status(200).send(response);
})

//app.get('/', (req, res) => res.send('Live modifiable now? Huh, amazing! Hello World! This time, from a NODE server! Now even from docker!!! wooooaa'))

app.get('/tito', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
  })
});

app.post('/tito', (req, res) => {
  console.log('in /tito');
  let help_text = "Welcome to Tito help!\n";
  help_text += "@tito help: muestra los comandos disponibles\n";
  help_text += "@tito info: muestra información del canal: integrantes, cantidad de mensajes, etc\n";
  help_text += "@tito mute <n>: desactiva respuestas por n segundos\n";
  help_text += "@tito me: muestra información del usuario que envia el mensaje.";

  let arg = req.body.arg;
  console.log(arg);

  //TODO ver esto
//  if (user_wants_to_be_muted(req.body.user_mail)){
//    res.status(200).end();
//  }

  if (arg == 'help'){
    res.status(200).send(help_text);

  } else if (arg == 'info'){

    console.log('in info');
    let organization_name = req.body.organization_name;
    let channel_name = req.body.channel_name;

    let endpoint = '/bots/' + organization_name + '/' + channel_name

    get_to_server(endpoint, function(response){
      res.status(200).send(response);
    })

  } else if (arg.split(' ')[0] == 'mute'){

    console.log('in mute');
    let seconds = Number(arg.split(' ')[1]);
    let organization_name = req.body.organization_name;
    let channel_name = req.body.channel_name;
//TODO complete this
    console.log('users wants to be muted for ' + seconds + ' seconds');

  } else if (arg == 'me'){

    let user_mail = req.body.user_mail

    let endpoint = '/bots/users/' + user_mail

    get_to_server(endpoint, function(response){
      res.status(200).send(response);
    })
  }
});


app.listen(port, () => {console.log(`Example app listening on port ${port}!`)})
