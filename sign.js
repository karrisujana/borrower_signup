const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/signup')                                                                                 
.then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
let borrowerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    residenceType: String,
    monthlyIncome: Number,
    previousLoan: String,
    maritalStatus: String,
    numberOfDependency: Number,
    city: String,
    state: String
},{versionKey:false});

let Borrower = mongoose.model("borrower",borrowerSchema,"borrowerdetails");

app.post('/borrower', async(req, res) => {
    try{
       const borrower = new Borrower(req.body);
       await borrower.save();
        res.send("Registration successful!");
    } 
    catch (error) {
        res.status(500).send("Error saving data");
    }
    });
    

app.use(express.static(__dirname));

app.listen(5001, () => {
    console.log('Server listening on port 5001');
});
