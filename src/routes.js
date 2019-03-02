const express = require('express')
const router = express.Router()
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const flashMiddleware = require('./app/middlewares/flash')

const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

router.use(flashMiddleware)

router.get('/files/:file', FileController.show)

router.get('/', guestMiddleware, SessionController.create)
router.post('/signin', guestMiddleware, SessionController.store)

router.get('/signup', guestMiddleware, UserController.create)
router.post(
  '/signup',
  guestMiddleware,
  upload.single('avatar'),
  UserController.store
)

router.use('/app', authMiddleware)
router.get('/app/logout', SessionController.destroy)

router.get('/app/dashboard', DashboardController.index)

router.get('/app/appointments/new/:provider', AppointmentController.create)
router.post('/app/appointments/new/:provider', AppointmentController.store)

router.get('/app/available/:provider', AvailableController.index)

module.exports = router
