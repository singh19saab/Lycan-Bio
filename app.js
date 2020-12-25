require("./models/db");
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const bodyparser = require('body-parser');
const User = mongoose.model('user');

var app = express();

app.use(bodyparser.urlencoded({
    extented: true,
}));
app.use(bodyparser.json());

//static files
app.use(express.static('public'));
app.use('/bootstrap4', express.static(__dirname + 'public/bootstrap4'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));

//set views
app.set('views', './views');
app.set('view engine', 'ejs');

//navigation
app.get('/', (req, res) => {
    res.render('index', { title: 'Home'})
});
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', user: '', Insertresult: '' })
});
app.get('/anatomical', (req, res) => {
    res.render('anatomical', { title: 'Anatomical Models'})
});
app.get('/bio3d', (req, res) => {
    res.render('bio3d', { title: 'Bio 3D'})
});
app.get('/cranial-remoulding', (req, res) => {
    res.render('cranial-remoulding', { title: 'Cranial Remoulding'})
});
app.get('/custom-insoles', (req, res) => {
    res.render('custom-insoles', { title: 'Custom Insoles'})
});
app.get('/dental', (req, res) => {
    res.render('dental', { title: 'Dental'})
});
app.get('/fractured-cast', (req, res) => {
    res.render('fractured-cast', { title: 'Fractured casts'})
});
app.get('/patient-implants', (req, res) => {
    res.render('patient-implants', { title: 'Patient Implants'})
});
app.get('/r&d', (req, res) => {
    res.render('r&d', { title: 'R&D'})
});
app.get('/samridhi', (req, res) => {
    res.render('samridhi', { title: 'Samridhi'})
});
app.get('/surgical-guides', (req, res) => {
    res.render('surgical-guides', { title: 'Surgical Guides'})
});
app.post('/submit', function (req, res) { 
    console.log(req.body);
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var user = new User();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.message = req.body.message;
    user.save((err, docs) => {
        if (!err)
            res.render("contact-success", {
                title: 'Contact'
            });
        else {
            console.log('error in recording' + err);
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("contact", {
                    user: req.body,
                    title: 'Contact',
                    Insertresult: ''
                });
            }
            else
                console.log('Error during record insertion:' + err);
        }
    })
}
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullname':
                body['fullNameError'] = "too short";
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = "Invalid Phone No.";
            default:
                break;
        }
    }
}

//listening at port 5000
var port = (process.env.port) || 5005;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})