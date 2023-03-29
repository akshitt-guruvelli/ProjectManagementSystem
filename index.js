const fs = require('fs');
const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");
const bodyparser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const cors = require('cors');
const User = require("./User");


const app = express();

const server = 'localhost:27017'
const database = 'traildb'

/*async () => {
    try {
        await mongoose.connect(`mongodb:// ${server}/${database}`);
        console.log("new db connected");
    }catch (err) {
        console.log("failed to new db");
    }
};

//connectdb
//module.exports = connectDB
//connectDB()*/
async function run () {
    await mongoose.connect("mongodb+srv://Shridb22:Shrilekha22@demo1.redzstq.mongodb.net/test", {
       // connectTimeoutMS: 50000,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(console.log("connected to server"))
    .catch((err) => console.log(err));;
    await mongoose.model('User').findOne();
}

run();



/*
mongoose.connect("mongodb://localhost:27017/local/newcollection", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(console.log("connected to server"))
.catch((err) => console.log(err));
*/






//const uri = process.env.ATLAS_URI;
//mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useCreateIndex: true });
//const studentSignUp = mongoose.model("studentSignUp", User.User);

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(require("express-session")({
	secret: "Rustydog",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


const port = 8000;
const home = fs.readFileSync('./index.html');
const faculty_login = fs.readFileSync('./facultyLogin.html');
const student_login = fs.readFileSync('./studentLogin.html');
const coordinator_login = fs.readFileSync('./coordinatorLogin.html');
const student_signup = fs.readFileSync('./studentSignUp.html');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get ('/', (req,res) => {
    res.set('content-Type', 'text/html');
    res.status(200).send(home)
})

app.get ('/index.html', (req,res) => {
    res.set('content-Type', 'text/html');
    res.status(200).send(home)
})

app.get ('/facultyLogin.html', (req,res) => {
    res.set('content-Type', 'text/html');
    res.status(200).send(faculty_login)
})

app.get ('/studentLogin.html', (req,res) => {
    res.set('content-Type', 'text/html');
    res.status(200).send(student_login)
})

app.get ('/coordinatorLogin.html', (req,res) => {
    res.set('content-Type', 'text/html');
    res.status(200).send(coordinator_login)
})

app.get ('/studentSignUp.html', (req,res) => {
    res.set('content-Type', 'text/html');
    res.status(200).send(student_signup)
})

// Handling user signup
app.post("/studentSignUp.html",(req, res) => {
	const user = new User({
	username: req.body.username,
	password: req.body.password
	});
    user.save()
	
	//return res.status(200).json(user);
    return res.status(200).json(user);
});
/*app.post("/studentSignUp.html", async (req, res) => {
	const user = await User.create({
	username: req.body.username,
	password: req.body.password
	});
	
	return res.status(200).json(user);
});*/


app.listen(port, (error) => {
    if(!error){
        console.log(`server running on port http://localhost:${port}`);
    }
    else {
        console.log("Error, server cant start");
    }
    

})

