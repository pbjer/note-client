import axios from 'axios';

// Allows us to omit the api root in axios requests using this instance.
// 'withCredentials' makes sure our cookie token is passed for authorization.
const instance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_ROOT}`,
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => { return handleErrorResponse(error); });

const handleErrorResponse = (e) => {
  const { status } = e.response;
  if (status === 401) {
    window.location.replace(
      `${process.env.REACT_APP_API_ROOT}/auth/google`
    );
  };
  return Promise.reject(e);
};

export default instance;
