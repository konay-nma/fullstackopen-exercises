const unknownEndPoint = (req, res,) => {
  return res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { unknownEndPoint }