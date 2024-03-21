const Job = require("../models/jobModel");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");
const { PythonShell } = require("python-shell");

//create job
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//single job
exports.singleJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {
      new: true,
    })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName lastName");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//delete job by id.
exports.deleteJob = async (req, res, next) => {
  try {
    const { industry } = req.body;

    let options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "../jobbs", // path to directory containing the Python script
      args: [industry],
    };

    PythonShell.run(
      "recommendation_script.py",
      options,
      function (err, results) {
        if (err) {
          console.error("Python script execution error:", err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          const recommendations = JSON.parse(results);
          res.status(200).json(recommendations);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.showJobs = async (req, res, next) => {
  //enable search
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // filter jobs by category ids
  let ids = [];
  const jobTypeCategory = await JobType.find({}, { _id: 1 });
  jobTypeCategory.forEach((cat) => {
    ids.push(cat._id);
  });

  let cat = req.query.cat;
  let categ = cat !== "" ? cat : ids;

  //jobs by location
  let locations = [];
  const jobByLocation = await Job.find({}, { location: 1 });
  jobByLocation.forEach((val) => {
    locations.push(val.location);
  });
  let setUniqueLocation = [...new Set(locations)];
  let location = req.query.location;
  let locationFilter = location !== "" ? location : setUniqueLocation;

  //enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  //const count = await Job.find({}).estimatedDocumentCount();
  const count = await Job.find({
    ...keyword,
    jobType: categ,
    location: locationFilter,
  }).countDocuments();

  try {
    const jobs = await Job.find({
      ...keyword,
      jobType: categ,
      location: locationFilter,
    })
      .sort({ createdAt: -1 })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName")
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.status(200).json({
      success: true,
      jobs,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      setUniqueLocation,
    });
  } catch (error) {
    next(error);
  }
};

//recemmond jobs by industry.
exports.recemmondJobs = async (req, res, next) => {
  try {
    const { industry } = req.body;

    let options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "backend/jobbs", // path to directory containing the Python script
      args: [industry],
    };

    // PythonShell.run(
    //   "app.py",
    //   options,
    //   function (err, results) {
    //     if (err) {
    //       console.error("Python script execution error:", err);
    //       res.status(500).json({ message: "Internal Server Error" });
    //     } else {
    //       const recommendations = JSON.parse(results);
    //       res.status(200).json(recommendations);
    //     }
    //   }
    // );
    let results = {
      success: true,
      jobs: [
        {
          available: true,
          _id: "65d31b3f7e10170f11b33ae7",
          title: "backend",
          description: "test008",
          salary: "120000",
          location: "Bangalore",
          jobType: {
            _id: "65bde3a451c26905cedbce2f",
            jobTypeName: "backend",
          },
          user: {
            _id: "65ce1e24a7cbc196bc5462f2",
            firstName: "admin",
          },
          createdAt: "2024-02-19T09:11:27.621Z",
          updatedAt: "2024-02-19T09:11:27.621Z",
          __v: 0,
        },
        {
          available: true,
          _id: "65d22be446cc691898ed482b",
          title: "Backend Analyst",
          description: "test007",
          salary: "12",
          location: "Bangalore",
          jobType: {
            _id: "65bde3b351c26905cedbce32",
            jobTypeName: "data analyst",
          },
          user: {
            _id: "65ce1e24a7cbc196bc5462f2",
            firstName: "admin",
          },
          createdAt: "2024-02-18T16:10:12.857Z",
          updatedAt: "2024-02-18T16:10:12.857Z",
          __v: 0,
        },
        {
          available: true,
          _id: "65d1fbbb1101bc0c20c0c7c2",
          title: "Backend Developer",
          description:
            "Seeking a skilled Frontend Developer proficient in HTML, CSS, and JavaScript. Must have experience with modern frameworks (e.g., React, Angular, Vue.js) and a keen eye for design detail. Collaborative, adaptable, and passionate about crafting engaging user experiences. Apply now!",
          salary: "18",
          location: "Mumbai",
          jobType: {
            _id: "65bde3a451c26905cedbce2f",
            jobTypeName: "backend",
          },
          user: {
            _id: "65ce1e24a7cbc196bc5462f2",
            firstName: "admin",
          },
          createdAt: "2024-02-18T12:44:43.271Z",
          updatedAt: "2024-02-18T12:44:43.271Z",
          __v: 0,
        },
      ],
      page: 1,
      pages: 1,
      count: 3,
      setUniqueLocation: ["Bangalore", "Mumbai", "Delhi"],
    };

    const recommendations = results;
    res.status(200).json(recommendations);
  } catch (error) {
    console.log("error ===", error);
    next(error);
  }
};
