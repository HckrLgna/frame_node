

const { Router } = require('express');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { checkFields } = require('../middleware/validar_campos');
const Role = require('../models/role');
const router = Router();


router.get('/ ', (req, res) => {
    res.send('Hello World');
    console.log('send from api');
});
router.get('/', userGet );
router.post('/', [
    check('name', 'Name is required').not().isEmpty(), //use xpress validator
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty().isLength({min: 6}),
    //check('role', 'Role is required').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( async( rol = '') =>{
       const existRole = await Role.findOne({rol});
       if(!existRole){
           throw new Error(`Role ${rol} is not registered in the database`);
       }
    }),
    checkFields
],userPost );
router.put('/:id', userPut );
router.patch('/', userPatch);
router.delete('/', userDelete);

module.exports = router;