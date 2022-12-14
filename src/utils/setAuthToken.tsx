import api from './api';

const setAuthToken = (token: any) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
    console.log("------------x-auth-token created----------------");
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
