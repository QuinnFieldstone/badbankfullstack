var express = require('express');
var app     = express();
var cors    = require('cors');
const mongoose = require('mongoose');
const User = require('./model.js');
const dotenv = require('dotenv');
dotenv.config();
//var dal     = require('./dal.js');
//const MongoClient = require('mongodb').MongoClient;
const url        = process.env.MONGODB_URI
// MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
//     if (err) {
//         console.error("Error connecting to db server:", err);
//     } else {
//         console.log("Connected successfully to db server");
//         const db = client.db('badbankfullstack');
//         const collection = db.collection('users');
//         app.locals.collection = collection();
//     }
// });
mongoose.connect(url).then(()=>{
    console.log("mongodb Connected")
})
// used to serve static files from public directory
app.use(express.json());
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', async function (req, res) {
console.log(req.params);
const newUser = await User.create(req.params);
res.json(newUser);
    // check if account exists
    // dal.find(req.params.email).
    //     then((users) => {

    //         // if user exists, return error message
    //         if(users.length > 0){
    //             console.log('User already in exists');
    //             res.send('User already in exists');    
    //         }
    //         else{
    //             // else create user
    //             dal.create(req.params.name,req.params.email,req.params.password).
    //                 then((user) => {
    //                     console.log(user);
    //                     res.send(user);            
    //                 });            
    //         }

    //     });
});


// login user 
app.get('/account/login/:email/:password', async function (req, res) {
    try{

   console.log(req.params); 
const user = await User.findOne({email:req.params.email});
if(!user){
    res.status(404).send('User Not Found');
    return
}
if(req.params.password !== user.password){
    res.status(403).send('Incorrect Password');
    return
}
res.status(200).json(user);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }

    // dal.find(req.params.email).
    //     then((user) => {

    //         // if user exists, check password
    //         if(user.length > 0){
    //             if (user[0].password === req.params.password){
    //                 res.send(user[0]);
    //             }
    //             else{
    //                 res.send('Login failed: wrong password');
    //             }
    //         }
    //         else{
    //             res.send('Login failed: user not found');
    //         }
    // });
    
});

// find user account
//app.get('/account/find/:email', function (req, res) {

    // dal.find(req.params.email).
    //     then((user) => {
    //         console.log(user);
    //         res.send(user);
    // });
//});

// // find one user by email - alternative to find
// app.get('/account/findOne/:email', function (req, res) {

//     // dal.findOne(req.params.email).
//     //     then((user) => {
//     //         console.log(user);
//     //         res.send(user);
//     // });
// });


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', async function (req, res) {

    var amount = Number(req.params.amount);
try{
    const updatedUser = await User.findOneAndUpdate({email:req.params.email}, {balance:amount}, {new:true})
    res.status(200).json(updatedUser);
} catch(error){
    console.log(error);
        res.status(500).json(error);
}
    // dal.update(req.params.email, amount).
    //     then((response) => {
    //         console.log(response);
    //         res.send(response);
    // });    
});

// all accounts
app.get('/account/all', async function (req, res) {
    const users = await User.find();
    res.status(200).json(users);

    // dal.all().
    //     then((docs) => {
    //         console.log(docs);
    //         res.send(docs);
    // });
});

var port = 3001;
app.listen(port);
console.log('Running on port: ' + port);