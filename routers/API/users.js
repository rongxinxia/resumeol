const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const keys =require('../../config/keys')


const validateRegister = require('../../validation/register');
const validateLogin = require('../../validation/login')

router.get('/test',(req,res) => res.json({msg:'Users Works'}));

//create User Profile
router.post('/register',(req,res) => {

    const {errors, isValid} = validateRegister(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user=>{
            if(user){
                return res.status(400).json({email: 'Email exists'});
            }else{
                const avatar = gravatar.url(req.body.email,{
                    s:'200', // size
                    r:'pg', //Rating
                    d: 'mm' //Default
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password:req.body.password
                });

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt, (err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user=>res.json(user))
                        .catch(err=>{
                            console.log(err)
                        })
                    })
                })
            }
        });
});

// user login

router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const {errors, isValid} = validateLogin(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email:email})
        .then(user=>{
            if(user){
                // check password
                bcrypt.compare(password,user.password)
                    .then(isMatch=>{
                        if(isMatch){
                            const payload ={
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                avatar: user.avatar
                            }

                            //console.log(payload);
                            // matched
                            jwt.sign(payload, keys.secretOrKey, {expiresIn: '1h'},(err,token)=>{
                                //console.log(token)
                                res.json({
                                    success:true,
                                    token: 'Bearer '+ token
                                })
                            })
                        }else{
                            return res.status(404).json({password:"wrong password"});
                        }
                    });
                
            }else{
                return res.status(404).json({email:"user not found"});
            }
        });
})


// return current user

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      });
    }
  );




module.exports = router;