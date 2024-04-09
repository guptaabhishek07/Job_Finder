// Import necessary libraries
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Tab,
  Tabs,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { BACKEND_BASE_URL } from "../redux/constants/jobconstant";
import axios from "axios";
import { saveAs } from "file-saver";
import Success from "./Success";
import Education from "./Education"; // Import the Education component

// Define validation schema
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  linkedin: yup.string().required("LinkedIn URL is required"),
  github: yup.string().required("GitHub URL is required"),
  skills: yup.string().required("Skills are required"),
  //Eduction details
  //edu1_school: yup.string().required("Enter your School/University Name"),
  //edu1_year: yup.string().required("Enter your School/University Year"),
  //edu1_qualification: yup.string().required("Enter your Education Qualification"),
  //edu1_desc: yup.string().required("Enter your Education Description"),
  //edu2_school: yup.string().required("Enter your 2nd School/University Name"),
  //edu2_year: yup.string().required("Enter your 2nd School/University Year"),
  //edu2_qualification: yup.string().required("Enter your 2nd Education Qualification"),
  //edu2_desc: yup.string().required("Enter your 2nd Education Description"),
  // Experiences details
  //exp1_org: yup.string().required("Enter your organization/company for experience 1"),
  //exp1_pos: yup.string().required("Enter your position for experience 1"),
  //exp1_desc: yup.string().required("Enter your description for experience 1"),
  //exp1_dur: yup.string().required("Enter your duration for experience 1"),
  //exp2_org: yup.string().required("Enter your organization/company for experience 2"),
  //exp2_pos: yup.string().required("Enter your position for experience 2"),
  //exp2_des: yup.string().required("Enter your description for experience 2"),
  //exp2_dur: yup.string().required("Enter your duration for experience 2"),
  // Projects details
  //proj1_title: yup.string().required("Enter your project 1 title"),
  //proj1_link: yup.string().required("Enter your project 1 link"),
  //proj1_desc: yup.string().required("Enter your project 1 description"),
  //proj2_title: yup.string().required("Enter your project 2 title"),
  //proj2_link: yup.string().required("Enter your project 2 link"),
  //proj2_desc: yup.string().required("Enter your project 2 description"),
  //Extra details
  //extra_1: yup.string().required("Enter the languages you know"),
  //extra_2: yup.string().required("Enter your hobby"),
});

const ResumeForm = () => {
  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      //Personal details
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      skills: "",
      //Education details
      edu1_school: "",
      edu1_year: "",
      edu1_qualification: "",
      edu1_desc: "",
      edu2_school: "",
      edu2_year: "",
      edu2_qualification: "",
      edu2_desc: "",
      //Experiences
      exp1_org: "",
      exp1_pos: "",
      exp1_desc: "",
      exp1_dur: "",
      exp2_org: "",
      exp2_pos: "",
      exp2_des: "",
      exp2_dur: "",
      //Project details
      proj1_title: "",
      proj1_link: "",
      proj1_desc: "",
      proj2_title: "",
      proj2_link: "",
      proj2_desc: "",
      //Extra details
      extra_1: "",
      extra_2: "",
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
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: 4,
      }}
    >
      <Paper sx={{ width: "100%", maxWidth: 700 }}>
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
                  error={
                    formik.touched.linkedin && Boolean(formik.errors.linkedin)
                  }
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
            {activeStep === 1 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  id="edu1_school"
                  name="edu1_school"
                  label="School/University"
                  value={formik.values.edu1_school}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.edu1_school &&
                    Boolean(formik.errors.edu1_school)
                  }
                  helperText={
                    formik.touched.edu1_school && formik.errors.edu1_school
                  }
                />
                <TextField
                  fullWidth
                  id="edu1_year"
                  name="edu1_year"
                  label="Year"
                  value={formik.values.edu1_year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.edu1_year && Boolean(formik.errors.edu1_year)
                  }
                  helperText={
                    formik.touched.edu1_year && formik.errors.edu1_year
                  }
                />
                <TextField
                  fullWidth
                  id="edu1_qualification"
                  name="edu1_qualification"
                  label="Qualification"
                  value={formik.values.edu1_qualification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.edu1_qualification &&
                    Boolean(formik.errors.edu1_qualification)
                  }
                  helperText={
                    formik.touched.edu1_qualification &&
                    formik.errors.edu1_qualification
                  }
                />
                <TextField
                  fullWidth
                  id="edu1_desc"
                  name="edu1_desc"
                  label="Description"
                  value={formik.values.edu1_desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.edu1_desc && Boolean(formik.errors.edu1_desc)
                  }
                  helperText={
                    formik.touched.edu1_desc && formik.errors.edu1_desc
                  }
                />
                <TextField
                  fullWidth
                  id="edu2_school"
                  name="edu2_school"
                  label="School/University"
                  value={formik.values.edu2_school}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.edu2_school &&
                    Boolean(formik.errors.edu2_school)
                  }
                  helperText={
                    formik.touched.edu2_school && formik.errors.edu2_school
                  }
                />
                <TextField
                  fullWidth
                  id="edu2_year"
                  name="edu2_year"
                  label="Year"
                  value={formik.values.edu2_year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.edu2_year && Boolean(formik.errors.edu2_year)
                  }
                  helperText={
                    formik.touched.edu2_year && formik.errors.edu2_year
                  }
                />
                <TextField
                  fullWidth
                  id="edu2_qualification"
                  name="edu2_qualification"
                  label="Qualification"
                  value={formik.values.edu2_qualification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.edu2_qualification &&
                    Boolean(formik.errors.edu2_qualification)
                  }
                  helperText={
                    formik.touched.edu2_qualification &&
                    formik.errors.edu2_qualification
                  }
                />
                <TextField
                  fullWidth
                  id="edu2_desc"
                  name="edu2_desc"
                  label="Description"
                  value={formik.values.edu2_desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.edu2_desc && Boolean(formik.errors.edu2_desc)
                  }
                  helperText={
                    formik.touched.edu2_desc && formik.errors.edu2_desc
                  }
                />
              </Box>
            )}
            {activeStep === 2 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  id="exp1_org"
                  name="exp1_org"
                  label="Organization/Company (Experience 1)"
                  value={formik.values.exp1_org}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.exp1_org && Boolean(formik.errors.exp1_org)
                  }
                  helperText={formik.touched.exp1_org && formik.errors.exp1_org}
                />
                <TextField
                  fullWidth
                  id="exp1_pos"
                  name="exp1_pos"
                  label="Position (Experience 1)"
                  value={formik.values.exp1_pos}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.exp1_pos && Boolean(formik.errors.exp1_pos)
                  }
                  helperText={formik.touched.exp1_pos && formik.errors.exp1_pos}
                />
                <TextField
                  fullWidth
                  id="exp1_desc"
                  name="exp1_desc"
                  label="Description (Experience 1)"
                  value={formik.values.exp1_desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.exp1_desc && Boolean(formik.errors.exp1_desc)
                  }
                  helperText={
                    formik.touched.exp1_desc && formik.errors.exp1_desc
                  }
                />
                <TextField
                  fullWidth
                  id="exp1_dur"
                  name="exp1_dur"
                  label="Duration (Experience 1)"
                  value={formik.values.exp1_dur}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.exp1_dur && Boolean(formik.errors.exp1_dur)
                  }
                  helperText={formik.touched.exp1_dur && formik.errors.exp1_dur}
                />
                <TextField
                  fullWidth
                  id="exp2_org"
                  name="exp2_org"
                  label="Organization/Company (Experience 2)"
                  value={formik.values.exp2_org}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.exp2_org && Boolean(formik.errors.exp2_org)
                  }
                  helperText={formik.touched.exp2_org && formik.errors.exp2_org}
                />
                <TextField
                  fullWidth
                  id="exp2_pos"
                  name="exp2_pos"
                  label="Position (Experience 2)"
                  value={formik.values.exp2_pos}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.exp2_pos && Boolean(formik.errors.exp2_pos)
                  }
                  helperText={formik.touched.exp2_pos && formik.errors.exp2_pos}
                />
                <TextField
                  fullWidth
                  id="exp2_des"
                  name="exp2_des"
                  label="Description (Experience 2)"
                  value={formik.values.exp2_des}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.exp2_des && Boolean(formik.errors.exp2_des)
                  }
                  helperText={formik.touched.exp2_des && formik.errors.exp2_des}
                />
                <TextField
                  fullWidth
                  id="exp2_dur"
                  name="exp2_dur"
                  label="Duration (Experience 2)"
                  value={formik.values.exp2_dur}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.exp2_dur && Boolean(formik.errors.exp2_dur)
                  }
                  helperText={formik.touched.exp2_dur && formik.errors.exp2_dur}
                />
              </Box>
            )}
            {activeStep === 3 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  id="proj1_title"
                  name="proj1_title"
                  label="Project Title 1"
                  value={formik.values.proj1_title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.proj1_title &&
                    Boolean(formik.errors.proj1_title)
                  }
                  helperText={
                    formik.touched.proj1_title && formik.errors.proj1_title
                  }
                />
                <TextField
                  fullWidth
                  id="proj1_link"
                  name="proj1_link"
                  label="Project Link 1"
                  value={formik.values.proj1_link}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.proj1_link &&
                    Boolean(formik.errors.proj1_link)
                  }
                  helperText={
                    formik.touched.proj1_link && formik.errors.proj1_link
                  }
                />
                <TextField
                  fullWidth
                  id="proj1_desc"
                  name="proj1_desc"
                  label="Project Description 1"
                  value={formik.values.proj1_desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.proj1_desc &&
                    Boolean(formik.errors.proj1_desc)
                  }
                  helperText={
                    formik.touched.proj1_desc && formik.errors.proj1_desc
                  }
                />
                <TextField
                  fullWidth
                  id="proj2_title"
                  name="proj2_title"
                  label="Project Title 2"
                  value={formik.values.proj2_title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.proj2_title &&
                    Boolean(formik.errors.proj2_title)
                  }
                  helperText={
                    formik.touched.proj2_title && formik.errors.proj2_title
                  }
                />
                <TextField
                  fullWidth
                  id="proj2_link"
                  name="proj2_link"
                  label="Project Link 2"
                  value={formik.values.proj2_link}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.proj2_link &&
                    Boolean(formik.errors.proj2_link)
                  }
                  helperText={
                    formik.touched.proj2_link && formik.errors.proj2_link
                  }
                />
                <TextField
                  fullWidth
                  id="proj2_desc"
                  name="proj2_desc"
                  label="Project Description 2"
                  value={formik.values.proj2_desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.proj2_desc &&
                    Boolean(formik.errors.proj2_desc)
                  }
                  helperText={
                    formik.touched.proj2_desc && formik.errors.proj2_desc
                  }
                />
              </Box>
            )}
            {activeStep === 4 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  id="extra_1"
                  name="extra_1"
                  label="Languages you know"
                  value={formik.values.extra_1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.extra_1 && Boolean(formik.errors.extra_1)}
                  helperText={formik.touched.extra_1 && formik.errors.extra_1}
                />
                <TextField
                  fullWidth
                  id="extra_2"
                  name="extra_2"
                  label="Hobbies"
                  value={formik.values.extra_2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.extra_2 && Boolean(formik.errors.extra_2)}
                  helperText={formik.touched.extra_2 && formik.errors.extra_2}
                />
              </Box>
            )}
            {/* Add other tabs similarly */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
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
