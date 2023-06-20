import axios from 'axios'

export const request = axios.create({
 baseURL: 'https://api.mpg.football/api',
  timeout: 15000
})
