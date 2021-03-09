
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const category= require("../server/routes/routes.category")
const entry=require("../server/routes/routes.passwordEntry")
const auth=require("../server/routes/routes.auth");

const corsOptions = {
    origin: true
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Password Manager application." });
});

app.use('/api/auth', auth);
app.use('/api/entry', entry);
app.use('/api/category', category)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


