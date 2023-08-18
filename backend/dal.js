const { application } = require('express');

const MongoClient = require('mongodb').MongoClient;
const url        ="mongodb+srv://quinnfieldstone:Rocky223@cluster0.vqyzemc.mongodb.net/";
let db            = null;

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) {
        console.error("Error connecting to db server:", err);
    } else {
        console.log("Connected successfully to db server");
        db = client.db('badbankfullstack');
        const collection = db.collection('users');
        app.locals.collection = collection();
    }
});


// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = req.app.locals.collection;
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};