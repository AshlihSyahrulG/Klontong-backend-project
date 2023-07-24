const express = require('express')
const app = express()
const port = 3000

const router = require('./router')
const error = require('./middleware/errorHandler')


app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use(router)
app.use(error)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})