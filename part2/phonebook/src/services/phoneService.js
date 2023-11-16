import axios from 'axios'

const baseUrl = '/api/persons';

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => `There was a problem loading the phonebook: ${error}`)
}

const create = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then(response => {
      return response.data;
    })
    .catch(error => `There was a problem creating the entry: ${error}`);
}

const remove = (personId) => {
  return axios
    .delete(`${baseUrl}/${personId}`)
    .then(response => {
      return response;
    })
    .catch(error => `There was a problem deleting the entry: ${error}`);

}

const update = (personId, personObj) => {
  return axios
    .put(`${baseUrl}/${personId}`, personObj)
    .then(response => {
      return response;
    })
    .catch(error => `There was a problem updating the entry: ${error}`)
}

export default { getAll, create, remove, update }