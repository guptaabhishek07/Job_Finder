import axios from 'axios';
import {
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SUCCESS,
} from "../constants/jobconstant"

import { BACKEND_BASE_URL } from '../constants/jobconstant';

export const recemmondedJobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        // axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${BACKEND_BASE_URL}/api/jobs/recommend`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response?.data?.error
        });
    }
}