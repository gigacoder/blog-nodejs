var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', function(req, res, next) {
  res.render('register', {
    'title' : 'Register'
  });
});
router.get('/login', function(req, res, next) {
  res.render('login', {
    'title' : 'Login'
  })
});
router.post('uers/register', function(req,res,next){
    // form value for validation
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;
    // condition for image field
    if(req.files.profileimage){
      console.log("uploading file");
      var imageRealeName = req.files.profileimage.originalname;
      var imageName = req.files.profileimage.name;
      var imageMime = req.files.profileimage.mimetype;
      var imagePath = req.files.profileimage.path;
      var imageExtension = req.files.profileimage.extension;
      var imageSize = req.files.profileimage.size;
    }else{
      var profileImageName = 'noimage.png';
    }
    // Express validator
    req.checkbody('name', 'Name Field is required.').notEmpty();
    req.checkbody('email', 'Email Field is required.').notEmpty();
    req.checkbody('email', 'Invalid Email Address.').isEmail();
    req.checkbody('userame', 'username is required.').notEmpty();
    req.checkbody('password', 'Password is required.').notEmpty();
    req.checkbody('confirmpassword', 'password do not match.').equals(req.body.password);

    //Error check
    var errors = req.validateErrors();
    if(errors){
      res.render.('register',{
        errors:errors,
        name: name,
        email :  email,
        username: username,
        password: password,
        confirmpassword: confirmpassword
      });
    }else{
       var newUser =  new User({
         name: name,
         email :  email,
         username: username,
         password: password,
         profileimage: imageName
       });

    }

});
module.exports = router;
