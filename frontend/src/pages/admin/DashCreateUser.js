import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerAUserAction } from "../../redux/actions/userAction"; // Assuming this action exists

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  emailId: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  // Add more validation as needed
});

const DashCreateUser = () => {
    const dispatch = useDispatch();
  
    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        emailId: '',
        password: '',
        // Add more fields as needed
      },
      validationSchema: validationSchema,
      onSubmit: (values, { resetForm }) => {
        dispatch(registerAUserAction(values)); // Dispatch the action to register the user
        resetForm();
      },
    });
  
    return (
      <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
        <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style'>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
              Create User
            </Typography>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              id="emailId"
              name="emailId"
              label="Email"
              value={formik.values.emailId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.emailId && Boolean(formik.errors.emailId)}
              helperText={formik.touched.emailId && formik.errors.emailId}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button fullWidth variant="contained" type='submit'>Create User</Button>
          </Box>
        </Box>
      </Box>
    );
};

export default DashCreateUser;
