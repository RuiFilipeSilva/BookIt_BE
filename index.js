const express = require("express");
const bodyParser = require("body-parser");
const validator = require('express-validator')
const cors = require("cors");
const config = require("./config.json");
const userRouter = require("./routes/userRouter.js");
const areaRouter = require("./routes/areaRouter")
const workshopRouter = require("./routes/workshopRouter")
const menuRouter = require("./routes/menuRouter");
const addonsRouter = require("./routes/addonsRouter")
const app = express();

app.use(validator());
app.use(function(req, res, next){
    for (var item in req.body) {
        req.sanitize(item).escape();
    }
    next();
})

app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());

app.use(cors());

app.use(userRouter);

app.use(areaRouter);

app.use(workshopRouter);

app.use(menuRouter);

app.use(addonsRouter);

app.listen(config.port, () => console.log(config.serverStartMessage, "https://apibookit.herokuapp.com/"));







