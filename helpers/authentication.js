const jwt = require("jsonwebtoken");
const config = require("../config/config.auth");
const db = require("../models");
const user = db.user;

verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Empty Token!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.id = decoded.id;
        next();
    });
}

isRegistered = (req, res, next) => {
    user.findByPk(req.id).then(user => {
        if(user===null){
            res.status(403).send({
                message: "Not a registered User"
            });
        }else{
            next();
            return;
        }
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isRegistered: isRegistered,
};

module.exports = authJwt;
