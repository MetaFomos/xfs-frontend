import api from '../../utils/api';
import { toast } from 'react-toastify';
import { GET_PENDING_IDEAS, GET_APPROVED_IDEAS, GET_FUNDREQUIRED_IDEAS, GET_BALANCE, GET_INPROGRESS_IDEAS, GET_COMPLETED_IDEAS } from '../action_types';

export const getIdeas = (formData: any) => async (dispatch: any) => {
    try {
        const res = await api.post('/idea/getIdea', formData);
        switch(formData.type) {
          case 'pending':
            dispatch({
              type: GET_PENDING_IDEAS,
              payload: res.data
            });
            break;
          case 'approved':
            dispatch({
              type: GET_APPROVED_IDEAS,
              payload: res.data
            });
            break;
          case 'fundrequired':
            dispatch({
              type: GET_FUNDREQUIRED_IDEAS,
              payload: res.data
            });
            return res.data;
            break;
          case 'inprogress':
            dispatch({
              type: GET_INPROGRESS_IDEAS,
              payload: res.data
            });
            break;
          case 'completed':
            dispatch({
              type: GET_COMPLETED_IDEAS,
              payload: res.data
            });
            break;
          default:
            break;
        }

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
}

// Approve idea
export const approveIdea = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/idea/approveIdea', formData);
    dispatch({
      type: GET_PENDING_IDEAS,
      payload: res.data
    });
    toast.success('Approved Idea', {
      position: "top-right",
      autoClose: 3000,
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
}

// Reject idea
export const rejectIdea = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/idea/rejectIdea', formData);
    dispatch({
      type: GET_PENDING_IDEAS,
      payload: res.data
    });
    toast.success('Success', {
      position: "top-right",
      autoClose: 3000,
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
}

// Proposal idea
export const proposalIdea = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/idea/proposalIdea', formData);
    dispatch({
      type: GET_APPROVED_IDEAS,
      payload: res.data
    });
    toast.success('Success', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
    const errors = err.response.data;
    toast.error(errors.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}

// Propose idea
export const proposeIdea = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/idea/proposeIdea', formData);
    dispatch({
      type: GET_APPROVED_IDEAS,
      payload: res.data
    });
    toast.success('Success', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
    const errors = err.response.data;
    toast.error(errors.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}

// Inprogress idea
export const inprogressIdea = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post('/idea/inprogressidea', formData);
    dispatch({
      type: GET_FUNDREQUIRED_IDEAS,
      payload: res.data
    });
    toast.success('Success', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
    const errors = err.response.data;
    toast.error(errors.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}

// Pull request submit
export const pullRequestSubmit = (formData: any) => async (dispatch: any) => {
  console.log(formData)
  try {
    const res = await api.post('/idea/pullRequestSubmit', formData);
    dispatch({
      type: GET_INPROGRESS_IDEAS,
      payload: res.data
    });
    toast.success('Success', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
    const errors = err.response.data;
    toast.error(errors.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}

// Confirm Pull request
export const confirmPullRequestSubmit = (formData: any) => async (dispatch: any) => {
  console.log(formData)
  try {
    const res = await api.post('/idea/confirmPullRequestSubmit', formData);
    dispatch({
      type: GET_INPROGRESS_IDEAS,
      payload: res.data
    });
    toast.success('Success', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
    const errors = err.response.data;
    toast.error(errors.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}

// Move complete idea
export const completeIdea = (formData: any) => async (dispatch: any) => {
  console.log(formData)
  try {
    const res = await api.post('/idea/completeIdea', formData);
    dispatch({
      type: GET_INPROGRESS_IDEAS,
      payload: res.data
    });
    toast.success('Success', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err: any) {
    const errors = err.response.data;
    toast.error(errors.msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}

// Submit idea
export const submitIdea = (formData: any) => async (dispatch: any) => {

  try {
    const res = await api.post('/idea', formData);
    return true;
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
    return false;
  }
};
  
// Get balance
export const getBalance = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.get(`https://explorer.xdag.io/api/balance/${formData.wallet}`);
    if(res.data.error) {
      dispatch({
        type: GET_BALANCE,
        payload: 0
      });
      return 0;
    } else {
      dispatch({
        type: GET_BALANCE,
        payload: parseFloat(res.data.balance)
      });
      return parseFloat(res.data.balance);
    }
  } catch (err: any) {
    console.log(err);
    dispatch({
      type: GET_BALANCE,
      payload: 0
    });
    return 0;
  }
}