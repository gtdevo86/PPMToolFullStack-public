const prod = {
  API_URL: 'https://api-dot-ppmtool-361806.uw.r.appspot.com',
}

const dev = {
  API_URL: 'http://localhost:5000',
  //API_URL: 'https://api-dot-ppmtool-361806.uw.r.appspot.com',
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod
