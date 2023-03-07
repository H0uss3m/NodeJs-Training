const express = require('express');

const app = express();

const mongoose = require('mongoose');

// connect to mongoDB

mongoose.connect('mongodb+srv://admin:admin1234@cluster0.rkr2qx9.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use(express.json())

// CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/api/stuff',(req,res,next)=>{
    const stuff = [{
        _id:"jlazmkfjd",
        title:"First Object",
        description:'First object informations',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price:5049,
        userId:'djslkfj'
    },{
        _id:"qllkhg",
        title:"Second Object",
        description:'Second object informations',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price:1049,
        userId:'djslkfj'
    }]

    res.status(200).json(stuff)
})
app.post('/api/stuff',(req,res,next)=>{
    const bodyData = req.body;
    console.log(bodyData)
    res.status(201).json({
        message: 'Obeject created'
    });
})
module.exports= app;