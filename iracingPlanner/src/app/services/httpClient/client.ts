// Code from @kylecrouse
// from https://gist.github.com/kylecrouse/b54478cffb97b9db92c9f557b164fc79

const axios = require('axios')
const { CookieJar } = require('tough-cookie')
const CryptoJS = require('crypto-js')
//const {HttpCookieAgent, HttpsCookieAgent} = require('http-cookie-agent/http')

export class Client {

  private readonly instance;

  constructor(email: string, password: string) {
    const jar = new CookieJar()

    this.instance = axios.create({
      baseURL: 'https://members-ng.iracing.com',
      //httpAgent: new HttpCookieAgent({ cookies: {jar} }),
      //httpsAgent: new HttpsCookieAgent({ cookies: {jar} }),
    })

    let hash = CryptoJS.SHA256(password + email.toLowerCase())
    let hashInBase64 = CryptoJS.enc.Base64.stringify(hash)

    // Authenticate if responds unauthorized
    this.instance.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        const { config, response: { status }} = error
        switch (status) {
          case 401:
            return this.authenticate(email, hashInBase64)
              .then(() => this.instance(config))
          case 503:
            return Promise.reject(new Error('iRacing down for site maintenance'))
          default:
            return Promise.reject(error)
        }
      }
    )
  }

  authenticate(email: string, password: string) {
    return this.instance({
      method: 'post',
      url: '/auth',
      data: JSON.stringify({ email: email, password: password })
    })
  }

  get(url: string) {
    return this.instance(url).then((res: any) => {
      console.log('------ res', res);
    })
      //.then(({ data: { link }}) => this.instance(link))
      //.then(({ data }) => data)
      .catch((err: any) => console.dir({err}))
  }

}
