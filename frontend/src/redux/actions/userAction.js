import axios from 'axios';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL
} from '../constants/userConstant';

import { BACKEND_BASE_URL } from '../constants/jobconstant';



export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/api/signin`, user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        Cookies.set("token", data.token, {expires: 7})
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response?.data?.error
        });
        toast.error(error.response?.data?.error);
    }
}

// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/api/signup`, user);        
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response?.data?.error
        });
        toast.error(error.response?.data?.error);
    }
}

//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        localStorage.removeItem('userInfo');
        const { data } = await axios.get(`${BACKEND_BASE_URL}/api/logout`);
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response?.data?.error
        });
        toast.error(error.response?.data?.error);
    }
}


//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${BACKEND_BASE_URL}/api/me`);
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response?.data?.error
        });
    }
}


//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${BACKEND_BASE_URL}/api/allusers`);
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response?.data?.error
        });
    }
}

//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    try {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/api/user/jobhistory`, job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Apply Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response?.data?.error
        });
        toast.error(error.response?.data?.error);
    }
}

// userAction.js

  export const registerAUserAction = (user) => async (dispatch) => {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      try {
          axios.defaults.withCredentials = true;
          const { data } = await axios.post(`${BACKEND_BASE_URL}/api/signup`, user);
          dispatch({
              type: USER_REGISTER_SUCCESS,
              payload: data
          });
          toast.success("User created successfully");
      } catch (error) {
          dispatch({
              type: USER_REGISTER_FAIL,
              payload: error.response?.data?.error
          });
          toast.error(error.response?.data?.error);
      }
  };


//delete single job action
export const deleteSingleUserAction = (user_id) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
        // axios.defaults.withCredentials = true;
        const { data } = await axios.delete(`${BACKEND_BASE_URL}/api/user/delete/${user_id}`);
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        });
        toast.success("User deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response?.data?.error
        });
        toast.error(error.response?.data?.error);
    }
}

