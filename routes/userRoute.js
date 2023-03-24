const express = require('express');
const { getAllUsers,registerUser,getMyProfile,login,logout } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();



router.get('/all',getAllUsers);

router.post('/new',registerUser);

router.post('/login', login);

router.get('/logout', logout);


router.get('/me',isAuthenticated,getMyProfile);


router.get('/',(req,res)=>{
    res.send('nice working');
});




module.exports =router;