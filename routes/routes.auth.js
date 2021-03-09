const helpers= require("../helpers");
const controller = require("../controllers/controller.auth");
const routerAuth=require("express").Router();

routerAuth.use(function(req, res, next) {

    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

routerAuth.post("/register",
    [
        helpers.verifyRegistration.checkDuplicateEmail,
    ],
    controller.signup
);

routerAuth.post("/login", controller.signin);

routerAuth.post("/logout", controller.deleteToken);

routerAuth.post("/validateMasterPassword", controller.validateMasterPassword)
module.exports=routerAuth;
