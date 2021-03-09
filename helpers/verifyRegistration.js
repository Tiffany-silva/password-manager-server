const db=require("../models");
const user = db.user;

checkDuplicateEmail = (req, res, next)=>{
// Email
    user.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });}


const verifyRegistration = {
    checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifyRegistration;
