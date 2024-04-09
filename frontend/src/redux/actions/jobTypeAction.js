import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CREATE_JOB_TYPE_FAIL,
    CREATE_JOB_TYPE_REQUEST,
    CREATE_JOB_TYPE_SUCCESS,
    JOB_TYPE_LOAD_FAIL,
    JOB_TYPE_LOAD_REQUEST,
    JOB_TYPE_LOAD_SUCCESS,
    DELETE_JOB_TYPE_FAIL,
    DELETE_JOB_TYPE_REQUEST,
    DELETE_JOB_TYPE_RESET,
    DELETE_JOB_TYPE_SUCCESS
} from '../constants/jobTypeConstant';

import { BACKEND_BASE_URL } from '../constants/jobconstant';

// load jobs type
export const jobTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_TYPE_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${BACKEND_BASE_URL}/api/type/jobs`);
        dispatch({
            type: JOB_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload: error.response?.data?.error
        });
    }
}


// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_TYPE_REQUEST })

    try {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/api/type/create`, jobtype)
        dispatch({
            type: CREATE_JOB_TYPE_SUCCESS,
            payload: data
        })
        toast.success("Job type created successfully");


    } catch (error) {
        dispatch({
            type: CREATE_JOB_TYPE_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}

//delete single job action
export const deleteJobTypeAction = (type_id) => async (dispatch) => {
    dispatch({ type: DELETE_JOB_TYPE_REQUEST });
    try {
        // axios.defaults.withCredentials = true;
        const { data } = await axios.delete(`${BACKEND_BASE_URL}/api/type/delete/${type_id}`);
        dispatch({
            type: DELETE_JOB_TYPE_SUCCESS,
            payload: data
        });
        toast.success("Job deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_JOB_TYPE_FAIL,
            payload: error.response?.data?.error
        });
        toast.error(error.response?.data?.error);
    }
}