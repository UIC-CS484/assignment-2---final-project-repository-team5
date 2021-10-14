var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
    res.render('login');
});*/

//module.exports = router;

const app = express();
const port = 3000;

app.get("/", (req,res) => {
    res.sendFile('./views/login.hbs');
})

app.listen(port, () => console.log("listening on port" +port))