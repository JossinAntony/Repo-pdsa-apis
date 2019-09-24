const Express = require('express');
const Mongoose = require('mongoose');
const bodyParser = require('body-parser')
const request = require('request');

var app = new Express();

app.set('view engine', 'ejs');
app.use(Express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
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

const SurveySchema = Mongoose.model('surveyees', {
    sname: String,
    sdesig: String,
    sdate: String,
    dcode: String,
    dplace: String,

    pname: String,
    pge: String,
    padhr: String,
    phname: String,
    pward: String,
    ppnchyth: String,
    pthlk: String,
    pdstrct: String,

    pmail: String,
    pmob: String,

    casualities: [
        {
            casStatus: String,
            casRln: String,
            casName: String,
            casAge: String
        }
    ],

    assets: [
        {
            astTyp: String,
            astStatus: String,
            astArea: String,
            astBldno: String
        }
    ],

    vehicles: [
        {
            vhlTyp: String,
            vhlStatus: String,
            vhlMake: String,
            vhlMdl: String,
            vhlNo: String,
            vhlIns: String
        }
    ],

    cmnts: String
});

const SurveyorSchema = Mongoose.model('surveyors', {
    uname: String,
    upass: String
});

const PeopleSchema = Mongoose.model('peoples', {
    pname: String,
    pge: String,
    padhr: String,
    children: [
        {
            cname: String,
            cge: String
        }
    ]
});


// ****************************************************
//-----APIs------------
//1. Save people
app.post('/savePeopleAPI', (req, res) => {
    // var person = new formSchema({'sname':req.query.sname, 'saddr':req.query.saddr, 'sgender':req.query.sgender, 'sdstrct':req.query.sdstrct, 'sbday':req.query.sbday, 'smob':req.query.smob, 'smail':req.query.smail, 'spass':req.query.spass, 'scpass':req.query.scpass});
    var people = new SurveySchema(req.body);
    console.log(req.body);
    var result = people.save((error, data) => {
        if (error) {
            throw error;
        } else {
            //res.send("<script>alert('New record created!')</script>");
            res.send(data);
            console.log(data);
        }
    });
})

const savePeopleAPILink = 'http://localhost:3052/savePeopleAPI';

//2. Retrive people
app.get('/retrievePeopleAPI', (req, res) => {
    var retrieve = SurveySchema.find((error, data) => {
        if (error) {
            throw error;
        } else {
            res.send(data);
            console.log(data);
        }
    });
});

const retrievePeopleAPILink = 'http://localhost:3052/retrievePeopleAPI';

//3. Retrieve a single person from databse using name.
app.post('/retrievePersonByNameAPI', (req, res) => {
    var name = req.body.pname;
    SurveySchema.find({ pname: name }, (error, data) => {
        if (error) {
            throw error;
        } else {
            //console.log(data);
            res.send(data);
        }
    })
})

const retrievePersonByNameAPILink = 'http://localhost:3052/retrievePersonByNameAPI';

//4. delete person API
app.post('/deletePersonAPI', (req, res) => {
    var id = req.body._id;
    SurveySchema.remove({ _id: id }, (error, data) => {
        if (error) {
            throw error;
        } else {
            //res.send(data);
            res.send({message:'success'});
        }
    })
})

const deletePersonAPILink = 'http://localhost:3052/deletePersonAPI';

//5. update person API
// app.post('/updatePersonAPI',(req,res)=>{
//     var person = req.body;
//     var personId = req.body._id;
//     var casualitiesId = req.body.casualities._id;
//     SurveySchema.update({_id:personId},{$set:{sname:person.sname,
//         sdesig: person.sdesig,
//         sdate: person.sdate,
//         dcode: person.dcode,
//         dplace: person.dplace,

//         pname: person.pname,
//         pge: person.pge,
//         padhr: person.padhr,
//         phname: person.phname,
//         pward: person.pward,
//         ppnchyth: person.ppnchyth,
//         pthlk: person.pthlk,
//         pdstrct: person.pdstrct,
    
//         pmail: person.pmail,
//         pmob: person.pmob,

//         casualities: person.casualities,
//         assets: person.assets,
//         vehicles: person.vehicles,
//         cmnts: person.cmnts
//     }},(error,data)=>{
//         if(error){
//             throw error;
//             res.send (error);
//         }else{
//             res.send({message:'success'});
//             console.log(data);
//         }
//     });
//     });

const updatePersonAPILink = 'http://localhost:3052/updatePersonAPI';

// ****************************************************
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT || 3052, () => {
    console.log("Server running at http://localhost:3052")
});