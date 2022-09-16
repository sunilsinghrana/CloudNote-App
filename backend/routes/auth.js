const express = require('express')
const User = require('../modles/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "RanaSunil9716"

// Route 1: Create a User using: POST "/api/auth/createuser". Doesn't require auth
router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
], async(req, res)=>{
    let success = false;
    // if there are errors written bad errors and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
    // check whether the user exist already
    let user = await User.findOne({email: req.body.email})
    if (user){
        success = false;
        return res.status(400).json({success, error: "sorry a user with this email already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt)
    // create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
    })
    const data ={
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    success = true;
    res.json({success, authtoken})
}
    // catch error
     catch (error) {
    console.error(error.message)
    res.status(500).send('some error occured')    
    }
    // .then(user => res.json(user)).catch((err)=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})
    

})

// Route 2: Authenticate a User using: POST "/api/auth/createuser". Doesn't require auth
router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async(req, res)=>{
    let success = false;
    // if there are errors written bad errors and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            success = false;
            return res.status(400).json({success, error: "Please login with right credentials"})
        }
        const passwordcompare = await bcrypt.compare(password, user.password)
        if(!passwordcompare){
            success = false;
            return res.status(400).json({success, error: "Please login with right credentials"})
        }
        const data ={
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authtoken})

    }catch (error) {
        console.error(error.message)
        res.status(500).send('some error occured')    
        }
    })

    // Route 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
    router.post('/getuser',fetchuser, async(req, res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('some error occured')    
        }
    })


module.exports = router