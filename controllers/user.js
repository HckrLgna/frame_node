const { response } = require('express');
const userGet = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'get api from controller'
    });
    console.log('send from api');
}

const userPost = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'post api from controller'
    })
}
const userPut = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'put api from controller'
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