const express = require('express')
const app = express()
// set the port of our application
// // process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Live modifiable now? Huh, amazing! Hello World! This time, from a NODE server! Now even from docker!!! wooooaa'))

app.listen(port, () => {console.log(`Example app listening on port ${port}!`)})
