const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/default')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || config.port;

const app = express()

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/notes', require('./routes/links.route'))


    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res)=>{
        // await req.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        fs.createReadStream(path.resolve(__dirname, 'client', 'build', 'index.html')) 
            .pipe(res);
    })
    

async function start_app(){
    try {
        await mongoose.connect(config.mongoUrl, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true 
        })
        app.listen(PORT, ()=>{
            console.log(`server has been started on ${PORT} port`)
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start_app()