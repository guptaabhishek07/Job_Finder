import React, { useState } from "react";
import { Box, Button, Typography, TextField, Tab, Tabs, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { BACKEND_BASE_URL } from '../redux/constants/jobconstant';
import axios from "axios";
import { saveAs } from "file-saver";
import Success from "./Success";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  linkedin: yup.string().required("LinkedIn URL is required"),
  github: yup.string().required("GitHub URL is required"),
  skills: yup.string().required("Skills are required"),
  // Add more validation as needed
});

const ResumeForm = () => {
  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      skills: "",
      // Add more fields as needed
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      axios
        .post(`${BACKEND_BASE_URL}/api/resume/create`, values)
        .then(() =>
          axios.get(`${BACKEND_BASE_URL}/api/resume/fetch`, {
            responseType: "blob",
          })
        )
        .then((res) => {
          const pdfBlob = new Blob([res.data], {
            type: "application/pdf",
          });
          setSuccess(true && res.status === 200);
          saveAs(pdfBlob, "Resume.pdf");
        })
        .catch((error) => console.error("Error:", error));
      resetForm();
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const tabs = [
    "Personal Details",
    "Education",
    "Experience",
    "Projects",
    "Extras",
  ];

  return (
    <Box sx={{ height: '100%', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pt: 4 }}>
      <Paper sx={{ width: '100%', maxWidth: 700 }}>
        <Tabs value={activeStep} centered>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
            {tabs[activeStep]}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {activeStep === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                  fullWidth
                  id="linkedin"
                  name="linkedin"
                  label="LinkedIn"
                  value={formik.values.linkedin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                  helperText={formik.touched.linkedin && formik.errors.linkedin}
                />
                <TextField
                  fullWidth
                  id="github"
                  name="github"
                  label="GitHub"
                  value={formik.values.github}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.github && Boolean(formik.errors.github)}
                  helperText={formik.touched.github && formik.errors.github}
                />
                <TextField
                  fullWidth
                  id="skills"
                  name="skills"
                  label="Skills"
                  value={formik.values.skills}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.skills && Boolean(formik.errors.skills)}
                  helperText={formik.touched.skills && formik.errors.skills}
                />
              </Box>
            )}
            {/* Add other tabs similarly */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === tabs.length - 1}
              >
                Next
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={activeStep !== tabs.length - 1}
              >
                Create Resume
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
      {success && <Success />}
    </Box>
  );
};

export default ResumeForm;
