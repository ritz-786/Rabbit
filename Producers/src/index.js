const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose');
const { pass, dbname, port } = require('../constants');
const userRouter = require('./routers/user');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user',userRouter)

mongoose.connect(
    `mongodb://ruffle:${pass}@cluster0-shard-00-00.rimcx.mongodb.net:27017,cluster0-shard-00-01.rimcx.mongodb.net:27017,cluster0-shard-00-02.rimcx.mongodb.net:27017/${dbname}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => app.listen(port,() => {
    console.log(`listening on port ${port}`)
}))
.catch(() => console.log(`Error COnnecting to Databse`));