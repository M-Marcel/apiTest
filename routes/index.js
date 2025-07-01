const express = require('express');
const router = express.Router();

const historyRoute = require('./api/history');
const configRoute = require('./api/config');
const usersRoute = require('./api/users');
const authRoute = require('./api/auth');
const profileRoute = require('./api/profile');
const postsRoute = require('./api/posts');
const tokensRoute = require('./api/tokens');
const tokenPairsRoutes = require('./api/tokenPairs');
const apiTestRoute = require('./api/apiTest');

router.use('/api/history', historyRoute);
router.use('/api/config', configRoute);
router.use('/api/users', usersRoute);
router.use('/api/auth', authRoute);
router.use('/api/profile', profileRoute);
router.use('/api/posts', postsRoute);
router.use('/api/tokens', tokensRoute);
router.use('/api/token-pairs', tokenPairsRoutes);
// assessment ApiTest
router.use('/api/apiTest', apiTestRoute);

module.exports = router;
