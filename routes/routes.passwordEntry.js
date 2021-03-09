
const passwordEntry = require("../controllers/controller.passwordEntry");
const  authJwt  = require("../helpers").authJwt;

let entryRouter = require("express").Router();

entryRouter.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

entryRouter.post("/",[authJwt.verifyToken], passwordEntry.create);

entryRouter.get("/findAllEntriesOfUser/:id", [authJwt.verifyToken],passwordEntry.findAllEntriesOfUser);


// Delete a vehicle with id
entryRouter.delete("/:id",[authJwt.verifyToken], passwordEntry.delete);

module.exports = entryRouter;
