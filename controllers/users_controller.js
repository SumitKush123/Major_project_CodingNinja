const User = require('../models/user');


module.exports.profile = function(req, res){
   if(req.cookies.user_id){
    User.findById(req.cookies.user_id, function(err,user){
        if(user){
            return res.render('user_profile', {
                title: 'User Profile',
                user: user
            })
        }
    })
   }
}
module.exports.getAll=(req,res)=>{
    User.find({})
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({message:err.message});
        })
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the singn up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}