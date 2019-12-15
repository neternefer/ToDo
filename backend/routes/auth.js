const router = require('express').Router();
const User = require('../model/user');
const {register, login} = require('../validation');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const priv = require('./private');
const hashing = require('../helpers/passwordHash')
const valid = require('../helpers/errorHandle')


router.post('/signup', valid(register), async (req, res)=> {
    //Check if user already exists
    const duplicate = await User.findOne({email: req.body.email});
    if(duplicate)return res.status(400).send('Email already exists');
    //Hash password
    const hashed = await hashing(req.body.password);
    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed
    });
    //Save new user to the database
    try{
        const newUser = await user.save();   
        //Issue jwt token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        //Add token to the header
        res.header('x-auth', token).send(_.pick(user, ['_id', 'email']));       
    }catch(err){
        res.status(400).send(err);
    }    
});
router.post('/login', [valid(login), priv], async (req, res) => {
    //Check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user)return res.status(400).send('Email doesn\'t exists');
    //Check if password is correct
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword)return res.status(400).send('Invalid email or password');
    res.send(_.pick(user, ['_id', 'email']));   
});
router.get('/', (req, res) => {
    //Show all users in database
    User.find({}, function(err, users) {
      const userMap = {};
      users.forEach(function(user) {
      userMap[user._id] = user;
      });
    res.send(userMap);  
    });
});
router.get('/myAccount', priv, (req, res) => {
    //Get current logged in user
    res.send(req.user);
});


module.exports = router;
