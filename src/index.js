const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Live modifiable now? Huh, amazing! Hello World! This time, from a NODE server! Now even from docker!!! wooooaa'))

app.listen(port, () => {console.log(`Example app listening on port ${port}!`)})
