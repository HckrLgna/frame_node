const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = (req, res = response) => {
    const {q, name, apikey} = req.query;
    res.json({
        ok: true,
        msg: 'get api from controller',
        q: q,
        name: name,
        apikey: apikey
    });
    console.log('send from api');
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
    res.json({
        msg: 'put api from controller',
        user
    })
}
const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch api from controller'
    })
}
const userDelete = (req, res =response) =>{
    res.json({
        ok:true,
        msg: 'delete api from controller'
    })
}



module.exports = {
    userGet, userPost, userPut, userPatch, userDelete
}