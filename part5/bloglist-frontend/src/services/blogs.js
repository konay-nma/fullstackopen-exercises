import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newtoken) => {
  token = `bearer ${newtoken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const update = async (id, updateBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateBlog);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data

}

export default { getAll, create, update, setToken, deleteBlog };
