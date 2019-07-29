// Requirements

const express           = require('express')
const router            = express.Router()
const usersController   = require('../Controllers/usersController')



// -----------------------------------------------------------------------------------------


// Routes

router.get('/', usersController.homepage)
router.get('/logout', usersController.userLogout)
router.get('/new', usersController.newUserPage)
router.get('/:id', usersController.profilePage)
router.get('/:id/edit', usersController.editProfile)
router.put('/:id', usersController.edit)
router.delete('/:id', usersController.deleteUser)
router.post('/register', usersController.createUser)
router.post('/login', usersController.userLogin)



// -----------------------------------------------------------------------------------------


// Export router

module.exports = router