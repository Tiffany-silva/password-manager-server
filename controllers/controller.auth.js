const db = require("../models");
const config = require("../config/config.auth");
const userdb = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup=(req, res)=>{
    console.log(req.body);
    // Save User to Database
    userdb.create({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        email:req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.status(200).json({success:  true, msg: "Successfully Registered"});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.signin = async (req, res) => {
    try{

        let user=await userdb.findOne({where: {email: req.body.email}});
        let response;
        if(user){
            console.log(user)
            response=await validateSignIn(req, res, user);
            res.status(200).send(response);
        }else{
            return res.status(404).send({ message: "User Not found." });
        }
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

validateSignIn=async (req, res, user)=>{
    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    console.log(passwordIsValid)
    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }
    if(user.token){
        res.status(400).send({  error: true, message: "already logged in"});
    }else{
        let token= await this.generateToken(user);

        let response={
            id: user.id,
            email: user.email,
            accessToken: token
        };
        return  response;
    }
}

exports.generateToken=async (user)=>{

    let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400});
    let done=await userdb.update({token: token}, {where: {id: user.id}});
    if(done) return token;
}

exports.findByToken= async (token)=>{
    jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
            return err;
        }
        let done = await userdb.findOne({where: {id: decoded.id, token: token}});
        return done;
    });
}

exports.deleteToken=(req, res)=>{
    userdb.update({token: null}, {where: {id: req.body.id}}).then(data=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send({ message: err.message });
    })
}

exports.validateMasterPassword=async (req, res)=>{
    let user= await userdb.findOne({where: {id: req.body.id}});
    console.log(user);
    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    console.log(passwordIsValid)
    if(passwordIsValid){
        res.status(200).send({message: 'success'});
    }else {
        res.status(500).send({message: 'failed'});
    }
}
