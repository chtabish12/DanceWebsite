const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const port = 80;


//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    contactNumber: String,
    email: String
});
const Contact = mongoose.model('Contact', contactSchema);



//EXPRESS STUFF
// app.use(express.static('static', options))
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

//PUG STUFF
app.set('view engine', 'pug')  // Set the template engine as pug

app.set('views', path.join(__dirname, 'views'))  // Set the views directory

//END POINTS

app.get('/', (req, res) => {

    // const params={ ""}
    res.status(200).render('home.pug')
})
app.get('/contact', (req, res) => {
    
    // const params={ ""}
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res) => {
    
    var myData= new Contact(req.body)
    myData.save().then(()=>{
        res.send("this item has been saved to database")
        // res.send("this item has been saved to database")
        
    }).catch(()=>{
        res.status(400).send('the item was not saved in the db')
        
    })
    
    // res.status(200).render('contact.pug')
})

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

