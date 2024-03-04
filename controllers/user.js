const { response } = require('express');
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

const userPost = (req, res = response) => {
    const body = req.body;
    res.json({
        ok: true,
        body: body
    })
}
const userPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put api from controller',
        id: id
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