const express = require('express');
const router = express.Router();
const userJson = require('../data/users/users.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(userJson);
});

/* GET user by id. */
router.get('/:userId([0-9]+)', function (req, res, next) {
  const userId = parseInt(req.params.userId, 10);
  const user = userJson.find((usr) => usr.id == userId);

  // Good enough, by default Status Code: 200
  res.send(user || {});

  // Better way
  // if (user) return res.send(user);
  // return res.status(404).send({});
});

module.exports = router;
