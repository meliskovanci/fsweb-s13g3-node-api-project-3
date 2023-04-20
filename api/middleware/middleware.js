const User = require('../users/users-model')




  function logger(req, res, next) {
    console.log(`[${new Date().toLocaleString()}] ${req.method} to ${req.url} `)
    next()
  }


async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({ message: "kullanıcı bulunamadı" })
    } else {
      req.user = user
      next()
    }
  } catch {
    res.status(500).json({
    message: 'Hata oluştu',
  });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: "gerekli name alanı eksik" })
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || !text.trim()) {
    res.status(400).json({ message: "gerekli text alanı eksik" })
  } else {
    req.text = text.trim()
    next()
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}