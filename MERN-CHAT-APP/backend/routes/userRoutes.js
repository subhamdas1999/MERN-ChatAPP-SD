
const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router()

//router.post('/',registration);
//router.post('/login',authUser);

router.route('/').post(registerUser);

router.route('/login').post(authUser);

router.route('/').get(protect,allUsers);


module.exports = router;