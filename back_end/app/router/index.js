const router = require('express').Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controller');

router.get('/', (req, res) => {
  res.send('welcome to our Motor Servicing App');
});
router.post('/signup', signup);
router.post('/login', login);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

module.exports = {
  router,
};
