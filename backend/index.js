const express = require('express')
const mongoose = require('mongoose')
const dotEnv= require('dotenv')
const pinPath= require('./routes/Pins')
const userPath= require('./routes/Users')
const app= express()

dotEnv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology:true} )
.then(()=>{console.log("mongoDb is here.");
})
.catch((err)=>{console.log(err)})

app.use("/api/pins", pinPath)
app.use("/api/users", userPath)
app.listen(4000, ()=>
{
    console.log("Server is listening.")
})