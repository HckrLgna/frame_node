const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async(req, res = response) => {
    const { limit = 5, from = 0} = req.query;
    const query = { state : true}
    
    const [total, users] = await Promise.all([
        User.countDocuments(query), 
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit)) 
    ]);
    res.json({
        total,
        users
    });
}

const userPost = async(req, res = response) => {
    
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});
    //check if email exists
   
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    //save in database
    await user.save();
    res.json({
        msg: 'postApi from controller',
        user
    });
}
const userPut = async (req, res = response) => {
    const id = req.params.id;
    const { password, google, email, ...resto} = req.body;
    //validate against database
    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, resto);
    res.json(user)
}
const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch api from controller'
    })
}
const userDelete = async (req, res =response) =>{
    const { id } = req.params;
    //delete from database
    const user = await User.findByIdAndUpdate(id, { state: false });

    res.json(
        user
    )
}



module.exports = {
    userGet, userPost, userPut, userPatch, userDelete
}