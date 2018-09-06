const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfile =  require('../../validation/profile')
const validateExperience =  require('../../validation/experience')
const validateEducation =  require('../../validation/education')

router.get('/test',(req,res) => res.json({msg:'Profile Works'}));

// get profile
router.get('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // find user
        Profile.findOne({user: req.user.id})
            .populate('user', ['name','avatar'])
            .then(profile => {
                if(!profile){
                    return res.status(404).json({noprofile:'there is no profile for the user'}); 
                }else{
                    res.json(profile);
                }
            }).catch(err=>res.status(404).json(err));
    }
  );

  // show all users
  router.get('/all', (req,res)=>{
      Profile.find()
            .populate('user', ['name','avatar'])
            .then(profiles =>{
                if(!profile){
                    return res.status(404).json({noprofile:'there is no profile for the user'}); 
                }else{
                    res.json(profile);
                }
            }).catch(err=>res.status(404).json(err));
  });


// get profiles by handle
  router.get('/handel/:handle', (req,res)=>{
    Profile.find({handle: req.params.handle})
    .populate('user', ['name','avatar'])
    .then(profiles =>{
        if(!profile){
            return res.status(404).json({noprofile:'there is no profile for the user'}); 
        }else{
            res.json(profile);
        }
    }).catch(err=>res.status(404).json(err));
});


// get profiles by user_id
router.get('/handel/:handle', (req,res)=>{
    Profile.find({user: req.params.user_id})
    .populate('user', ['name','avatar'])
    .then(profiles =>{
        if(!profile){
            return res.status(404).json({noprofile:'there is no profile for the user'}); 
        }else{
            res.json(profile);
        }
    }).catch(err=>res.status(404).json(err));
});

// post profile
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfile(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profileFields = {};
        if(req.user.id) profileFields.user = req.user.id;
        if(req.user.handle) profileFields.handle = req.user.handle;
        if(req.user.company) profileFields.company = req.user.company;
        if(req.user.website) profileFields.website = req.user.website;
        if(req.user.location) profileFields.location = req.user.location;
        if(req.user.bio) profileFields.bio = req.user.bio;
        if(req.user.githubusername) profileFields.githubusername = req.user.githubusername;

        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        profileFields.social={};


        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;


        Profile.findOne({user: profileFields.user})
                .then(profile => {
                    if(profil.e){
                        // update profile
                        Profile.findOneAndUpdate(
                            {user: profileFields.user},
                            {$set: profileFields},
                            {new: true}
                        ).then(profile=>{
                            res.json(profile)
                        })
                    }else{
                        // create new profile
                        Profile.findOne({handle: profileFields.handle})
                            .then(profile=>{
                                if(profile){
                                    res.status(400).json({handle: 'the handle has already exists'});
                                }
                            });
                        new Profile(profileFields).save().then(profile=>res.json(profile));
                    }
                })
                .catch(err => res.status(404).json(err));
    }
)

//post experience
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) =>{
        const { errors, isValid } = validateExperience(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({user: req.user.id})
                .then(profile =>{
                    const newExp = {
                        title: req.body.title,
                        company: req.body.company,
                        location: req.body.location,
                        from: req.body.from,
                        to: req.body.to,
                        current: req.body.current,
                        description: req.body.description
                    };
                    
                    // add exp
                    profile.experience.unshift(newExp);
                    // save profile
                    profile.save().then(profile=> res.json(profile));
                })
                .catch(err => res.status(404).json(err));
    }
)

//post education
router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) =>{
        const { errors, isValid } = validateEducation(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({user: req.user.id})
                .then(profile =>{
                    const newEdu = {
                        school: req.body.school,
                        degree: req.body.degree,
                        fieldofstudy: req.body.fieldofstudy,
                        from: req.body.from,
                        to: req.body.to,
                        current: req.body.current,
                        description: req.body.description
                    };
                    // add exp
                    profile.education.unshift(newEdu);
                    // save profile
                    profile.save().then(profile=> res.json(profile));
                })
                .catch(err => res.status(404).json(err));
    }
)

// delete experience
router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({user: req.user.id})
                .then(profile =>{
                    const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);

                    // Splice out of array
                    profile.experience.splice(removeIndex, 1);

                    // Save
                    profile.save().then(profile => res.json(profile));
                })
                .catch(err => res.status(404).json(err));}
)

// delete education
router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({user: req.user.id})
                .then(profile =>{
                    const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);

                    // Splice out of array
                    profile.experience.splice(removeIndex, 1);

                    // Save
                    profile.save().then(profile => res.json(profile));
                })
                .catch(err => res.status(404).json(err));}
)

router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    }
  );

module.exports = router;