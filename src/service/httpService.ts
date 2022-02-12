import axios, { AxiosInstance } from "axios"
import Config from "./Config"

const qs = require("qs")

const http = axios.create({
  baseURL: Config.ROOT,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    })
  },
})

http.interceptors.request.use(
  function (config) {
    config.headers!["Content-Type"] = "application/json"
    config.headers!["Access-Control-Allow-Origin"] = "https://marvel-test-app.netlify.app/"
    return config
  },

  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    if (response.data.exception) {
      throw response.data.exception
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const marvelHttp = (): AxiosInstance => {
  http.defaults.baseURL = Config.ROOT
  return http
}

export default http
