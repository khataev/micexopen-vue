import express from 'express'
import axios from 'axios'
const qs = require('qs')

const config = require('../../nuxt.config.js')

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/rates/usd', (req, res) => {
  axios
    .get(config.env.USD_RATES_URL, { params: qs.parse(req.query) })
    .then(result => res.json(result.data))
    .catch(error => res.status(422).json({ error: error.message }))
})

router.get('/rates/usd_tom', (req, res) => {
  axios
    .get(config.env.USD_TOM_RATES_URL, { params: qs.parse(req.query) })
    .then(result => res.json(result.data))
    .catch(error => res.status(422).json({ error: error.message }))
})

router.get('/open_positions/:date', (req, res) => {
  const moexUrl = `${config.env.MOEX_CSV_BASE_URL}/${req.params.date}`
  axios
    .get(moexUrl)
    .then(result => res.send(result.data))
    .catch(error => res.status(422).json({ error: error.message }))
})

router.get('/holidays', (req, res) => {
  const baseParams = {
    api_key: config.env.CALENDARIFIC_API_KEY,
    country: 'RU'
  }
  const params = qs.parse(req.query)
  const resultParams = Object.assign(baseParams, params)
  axios
    .get(config.env.CALENDARIFIC_URL, { params: resultParams })
    .then(result => res.json(result.data))
    .catch(error => {
      console.log('HOLIDAYS error:', error.message)
      res.status(422).json({ error: error.message })
    })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
