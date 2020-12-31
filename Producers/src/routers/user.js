const express = require('express')
const mongoose = require('mongoose')
const { queue_name } = require('../../constants')

const User = require('../../models/user')
const { publishToQueue } = require('../../services/MQService')

const router = express.Router()

router.get('/',async(req,res) => {
    res.send('Welcome To User Section');
})

router.post('/add',async (req,res) => {
    try{
        const checkUser = await User.findOne({
            email: req.body.email
        }).exec();

        if(checkUser!=null){
            res.status(200).json({
                message: 'User already Present',
                status: 0
            });
        }else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email
            });

            const result = await user.save();
            await publishToQueue(queue_name,result._doc._id);
            res.status(200).json({
                id: result._doc._id,
                status: 1
            });
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            error: err,
            success: 0
        });
    }
})


router.post('/findUser',async (req,res) => {
    try{
        const user = await User.findOne({
            _id: req.body.id 
        })

        if(user == null) {
            res.status(200).json({
                message: 'User not found',
                success: 0
            });
        }else{
            const {name,email} = user._doc;
            res.status(200).json({
                name,
                email,
                status: 1
            });
        }
    }catch(err){
        res.status(200).json({
            error: err,
            success: 0
        });
    }
})

module.exports = router