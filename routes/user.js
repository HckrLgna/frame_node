

const { Router } = require('express');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');
const router = Router();


router.get('/ ', (req, res) => {
    res.send('Hello World');
    console.log('send from api');
});
router.get('/', userGet );
router.post('/', userPost );
router.put('/:id', userPut );
router.patch('/', userPatch);
router.delete('/', userDelete);

module.exports = router;