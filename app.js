const Express=require('express');
const Mongoose = require('mongoose');
const bodyParser = require('body-parser')
const request = require('request');

var app=new Express();

app.set('view engine', 'ejs');
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );
    // res.setHeader('Access-Control-Allow-Origin', 'https://studentdb1-jossin.herokuapp.com' ); // request origin/ name of app.

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

Mongoose.connect('mongodb://localhost:27017/SurveyDB', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    //console.log('Database online');
    });

//Mongoose.connect('mongodb+srv://jossin:jossin@cluster0-arjkd.mongodb.net/test?retryWrites=true&w=majority');


app.get('/',(req,res)=>{
    res.render('index');
});

app.listen(process.env.PORT || 3052,()=>{
    console.log("Server running at http://localhost:3052")
})