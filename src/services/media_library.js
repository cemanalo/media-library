import axios from 'axios'

const BASE_URL = "http://localhost:3000/api"
export const getSubDirectory = async (parentId, isDirectory=true) => {
  const query = {
    where: {
      parent_id: parentId,
      is_directory: isDirectory
    }
  }

  return axios.get(`${BASE_URL}/media_libs?filter=${JSON.stringify(query)}`)

}

export const createNewFolder = async (folder) => {
  return axios.post(`${BASE_URL}/media_libs`, folder)
}

export const fileUpload = async (file) => {
  return axios.post(`${BASE_URL}/file_uploads/media/upload`, file, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
  })
}
