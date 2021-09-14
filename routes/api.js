const router = require('express').Router()

router.use('/api', require('./noteRoutes.js'))
router.use('/', require('./get.js'))

module.exports = router
