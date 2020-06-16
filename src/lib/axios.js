import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_ROOT}`,
});

export default instance;
