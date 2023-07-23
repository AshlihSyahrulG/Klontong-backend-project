const express = require('express')
const app = express()
const port = 3000

const router = require('./router')
const userController = require('./controllers/userController')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/', userController.register)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})