const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const date = moment()

    if (req.session.user.provider) {
      const appointments = await Appointment.findAll({
        where: { provider_id: req.session.user.id },
        date: {
          [Op.gt]: date.format()
        }
      }).map(async a => {
        const customer = await User.findByPk(a.user_id)
        return {
          date: moment(a.date).format('DD/MM - HH:mm'),
          customer: customer.name,
          avatar: customer.avatar
        }
      })
      return res.render('dashboard', { appointments })
    }

    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
