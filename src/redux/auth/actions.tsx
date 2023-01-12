import api from '../../utils/api';
import { toast } from 'react-toastify';
import {
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../action_types';

// Load User
export const loadUser = () => async (dispatch: any) => {
  try {
    const res = await api.get('/auth');
    if(localStorage.token) {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: 'AUTH_ERROR'
    // });
  }
};

// Login User
export const login = (formData: any) => async (dispatch: any) => {

  try {
    const res = await api.post('/auth/login', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => {
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

// Register User
export const register = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/auth/register', formData);

    console.log(res);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    
  } catch (err: any) {
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error: any) => 
    //     toast.error(error.msg, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       })  
    //   );
    // }
    // dispatch({
    //   type: REGISTER_FAIL
    // });
  }
};

export const socialMediaLogin = (formData: any) => async (dispatch: any) => {

  try {
    const res = await api.post('/auth/sm-login', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    toast.success('Login success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => {
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });
    }
  }
};

export const socialMediaSignUp = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/auth/sm-signup', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    toast.success('Register success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => 
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })  
      );
    }
  }
}

export const githubAuth_signup = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/auth/githubAuth_signup', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    toast.success('Register success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return true;
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => 
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })  
      );
    }
    return false;
  }
}

export const githubAuth_signin = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/auth/githubAuth_signin', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    toast.success('Login success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => 
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })  
      );
    }
  }
}

export const editProfile = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/auth/editProfile', formData);
    dispatch(loadUser());
    toast.success('Success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => 
        toast.error(error.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })  
      );
    }
  }
}

export const changePassword = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/auth/changePassword', formData);
    dispatch(loadUser());
    toast.success('Success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })  
  }
}

export const logout = () => ({ type: LOGOUT });

  //cotact admin
  