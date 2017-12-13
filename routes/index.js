var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color});
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


router.get('/comment', function(req,res,next) {
  console.log("Comment");
  Comment.find(function(err, commentList) {
    if(err) return console.error(err);
    else {
      console.log(commentList);
      res.json(commentList);
    }
  });  
});


router.post('/comment', function(req, res, next) {
  console.log("Comment Post");
  console.log("req.body");
  var newComment = new Comment(req.body);
  newComment.save(function(err, post) {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});



router.post('/deleteComments', function(req, res, next) {
  console.log("delete")
  Comment.remove({}, function(err, removed) {
    if(err) return console.error(err);
    console.log(removed);
  })

});


module.exports = router;