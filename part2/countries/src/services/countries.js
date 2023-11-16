import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

function getAll() {
  return axios
    .get(`${baseUrl}/all`)
    .then(response => {
      return response.data;
    });

}

function get(name) {

}

export default { getAll, get }