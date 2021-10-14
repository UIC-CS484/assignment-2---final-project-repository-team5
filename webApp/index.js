const express = require('express')
const app = express()
const port = 3000



//middleware

//handlebars
app.set('views', './views');
app.set('view engine', 'hbs');

//parse application/json
app.use(express.json());

app.use(express.urlencoded());

app.get('/',(req, res) => {
    res.render('index');
})

// app.post('/info', (req, res) =>{
//     const lastName = req.body.lname;
//     const firstName = req.body.fname;
//     console.log(lastName + " , " + firstName );
//     res.send(`<ul> <li>First Name: ${firstName}</li>  <li>Last Name: ${lastName}</li></ul>`);
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})