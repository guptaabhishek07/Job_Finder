import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ResumeRoute = ({ children }) => {

    const { resumeInfo } = useSelector((state) => state.signIn);
    return resumeInfo ? children : <Navigate to="/" />;
}

export default ResumeRoute;