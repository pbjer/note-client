import axios from 'axios';

// Allows us to omit the api root in axios requests using this instance.
// 'withCredentials' makes sure our cookie token is passed for authorization.
const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_ROOT}`,
});

export default instance;
