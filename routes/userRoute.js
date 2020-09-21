const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');


router.post("/signin",async (req, res) => {
  try {
    const user = await User.findOne({
      email:req.body.email,
      password:req.body.password
    })
    if(user){
      res.send({
        _id:user.id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:getToken(user)
      })
    }
       
  } catch (error) {
      res.send(error.message)
  }
});





router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Basir',
      email: 'req.body.email',
      password: '123',
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(user);
  } catch (error) {
      res.send(error.message)
  }
});

module.exports = router;
