const { Router } = require('express')
const router = new Router()

router.post('/', async (req, res) => {
  //ощичуємо сесію
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = router
