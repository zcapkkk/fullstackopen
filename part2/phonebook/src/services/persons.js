import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'


const getAll = () => {
  const request = axios.get(baseurl)
  return request.then(response => response.data)
}


const create = newObj => {
  const request = axios.post(baseurl, newObj)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const delurl = `http://localhost:3001/persons/${id}`
  const request = axios.delete(delurl)
  return request.then(response => response.data)
}

const editPerson = (id, newObj) => {
  const editurl = `http://localhost:3001/persons/${id}`
  const request = axios.put(editurl, newObj)
  return request.then(response => response.data)
}

const services = { getAll, create, deletePerson, editPerson }

export default services
