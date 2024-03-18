

const { Router } = require('express');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { checkFields } = require('../middleware/validar_campos');
const { isValidRole, isEmailValid , isUserExistById} = require('../helpers/db_validators');
const router = Router();


router.get('/ ', (req, res) => {
    res.send('Hello World');
    console.log('send from api');
});
router.get('/', userGet );
router.post('/', [
    check('name', 'Name is required').not().isEmpty(), //use xpress validator
    check('email', 'Email is required').isEmail(),
    check('email').custom( isEmailValid),
    check('password', 'Password is required').not().isEmpty().isLength({min: 6}),
    //check('role', 'Role is required').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole),
    checkFields
],userPost );
router.put('/:id',[
    check('id', 'is not a valid ID').isMongoId(),
    check('id').custom( isUserExistById ),
    check('role').custom( isValidRole),
    checkFields
], userPut );
router.patch('/', userPatch);
router.delete('/:id',[
    check('id', 'is not a valid ID').isMongoId(),
    check('id').custom( isUserExistById ),
    checkFields
], userDelete);

module.exports = router;