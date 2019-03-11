module.exports = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({error: 'Not Authorized'});
  } else {
    res.status(500).send({error: err});
  }
};