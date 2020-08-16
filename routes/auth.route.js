const {Router} = require('express')
const userModel = require('../models/user')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const jsonParser = require('express').json();
const bcrypt = require('bcrypt')
const router = Router()

router.use(jsonParser)

let validationReg = [
    check('pass', 'Minimum pass\' length should be 6 symbols').isLength(6)
]
let validationLogin = [
    check('pass', 'Minimum pass\' length should be 6 symbols').isLength(6)
]
router.post('/register', validationReg, async (req, res)=>{
    console.log(req.body)
    let validationErrors = validationResult(req)
        try {
            if (validationErrors.errors.length!==0){
                console.log('err' ,validationErrors.errors)
                let validError = [] 
                validationErrors.errors.forEach(el=>validError.push(el.msg))
                return res.status(500).json({message: validationErrors.errors[0].msg})
            }
            console.log(req.body)
            let {login, pass} = req.body
            let candidate = await userModel.findOne({login: login})
            if(candidate){
                return res.status(400).json({message: `User ${login} is already exist`})
            }
            let hashedPass = await bcrypt.hash(pass, 9)
            let newUser = await userModel({login: login, pass: hashedPass})
            await newUser.save()

            let token = jwt.sign(
                {userId: newUser.id},
                require('../config/default').secret,
                // {expiresIn: '1h'}
            )

            res.status(201).json({token, userId: newUser.id, message: `User ${login} was been created successfully`}) 
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something went wrong... Try it again, please.'})
        }
})

router.post('/login', validationLogin, async (req, res)=>{
    console.log(req.body)
    let validationErrors = validationResult(req)
    try {
        if (validationErrors.errors.length!==0){
            console.log('err' ,validationErrors.errors)
            let validError = [] 
            validationErrors.errors.forEach(el=>validError.push(el.msg))
            return res.status(500).json({message: validationErrors.errors[0].msg})
        }
        console.log(req.body)
        let {login, pass} = req.body
        let user = await userModel.findOne({login: login})
        if (!user){
            return res.status(400).json({message: 'User can\'t be found'})
        }
        let isPassMatch = await bcrypt.compare(pass, user.pass);
        if(!isPassMatch){
            return res.status(400).json({message: 'Incorrect data. Try it again'})
        }

        let token = jwt.sign(
            {userId: user.id},
            require('../config/default').secret,
            // {expiresIn: '1h'}
        )
        console.log(user.id)
        res.json({token, userId: user.id})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong... Try it again, please.'})
    }
})

module.exports = router;