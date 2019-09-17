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

const SurveySchema = Mongoose.model('surveyees',{
    pname:String,
    pge:String,
    padhr:String,
    pmob:String,
    pmail:String,
    phname:String,
    pward:String,
    ppnchyth:String,
    pthlk:String,
    pdstrct:String
    });
    
const SurveyorSchema = Mongoose.model('surveyors',{
    uname:String,
    upass:String
});

const PeopleSchema = Mongoose.model('peoples',{
    pname:String,
    pge:String,
    padhr:String,
    children: [
        {
            cname: String,
            cge: String
        }
      ]
    });

// const PeopleSchema = Mongoose.model('peoples',{
//         pname:String,
//         pge:String,
//         padhr:String,
//         children: [
//             children
//           ]
//         });


// const children = Mongoose.model('childs',{
//     cname: String,
//     cge: String
// });
// ****************************************************
//-----APIs------------
//1. Save people
app.post('/savePeopleAPI',(req, res) => {
    // var person = new formSchema({'sname':req.query.sname, 'saddr':req.query.saddr, 'sgender':req.query.sgender, 'sdstrct':req.query.sdstrct, 'sbday':req.query.sbday, 'smob':req.query.smob, 'smail':req.query.smail, 'spass':req.query.spass, 'scpass':req.query.scpass});
    var people = new PeopleSchema(req.body);
    console.log(req.body);
    var result = people.save((error, data)=>{
        if (error){
            throw error;
        }else{
            //res.send("<script>alert('New record created!')</script>");
            res.send(data);
            console.log(data); 
        }
    });
})

const savePeopleAPILink = 'http://localhost:3052/savePeopleAPI';

//2. Retrive people
app.get('/retrievePeopleAPI',(req,res)=>{
    var retrieve = PeopleSchema.find((error,data)=>{
        if (error){
            throw error;
        }else{
            res.send(data);
            console.log(data);
        }
    });
});

const retrievePeopleAPILink = 'http://localhost:3052/retrievePeopleAPI';
// ****************************************************
app.get('/',(req,res)=>{
    res.render('index');
});

app.listen(process.env.PORT || 3052,()=>{
    console.log("Server running at http://localhost:3052")
});