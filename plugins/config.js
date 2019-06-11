// Simple config without `convict` package
export const USD_RATES_URL =
  process.env.USD_RATES_URL ||
  'http://vmnet.herokuapp.com/api/v1/rates/usd.json'
export const USD_TOM_RATES_URL =
  process.env.USD_TOM_RATES_URL ||
  'http://vmnet.herokuapp.com/api/v1/spot_rates/usdrub_tom.json'
export const CALENDARIFIC_URL =
  process.env.CALENDARIFIC_URL || 'https://calendarific.com/api/v2/holidays'
export const CALENDARIFIC_API_KEY = process.env.CALENDARIFIC_API_KEY
// `http://moex.com/ru/derivatives/open-positions-csv.aspx?d=${date}&t=1`
export const MOEX_CSV_BASE_URL =
  process.env.MOEX_CSV_BASE_URL || 'http://vmnet.herokuapp.com/open_positions'
export const INITIAL_FEATURE_CODE = process.env.INITIAL_FEATURE_CODE || 'Si_F'
