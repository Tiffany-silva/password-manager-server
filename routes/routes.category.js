
const category = require("../controllers/controller.category");
const  authJwt  = require("../helpers").authJwt;

let categoryRouter = require("express").Router();

categoryRouter.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

categoryRouter.post("/",[authJwt.verifyToken], category.create);

categoryRouter.get("/findAllCategories", [authJwt.verifyToken],category.findAll);

module.exports = categoryRouter;
