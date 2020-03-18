import axios from 'axios'

const BASE_URL = "http://localhost:3000/api"
export const getSubDirectory = async (parentId) => {
  const query = {
    where: {
      parent_id: parentId,
      is_directory: true
    }
  }

  return axios.get(`${BASE_URL}/media_libs?filter=${JSON.stringify(query)}`)

}

export const createNewFolder = async (folder) => {
  return axios.post(`${BASE_URL}/media_libs`, folder)
}
