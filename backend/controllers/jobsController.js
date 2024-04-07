const Job = require("../models/jobModel");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");
const { PythonShell } = require("python-shell");
const axios = require("axios");
const userjobMappingModel = require("../models/userjobMappingModel");
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
    // const isJobApplied = await userjobMappingModel.find({
    //   $where: {
    //     jobId: req.params.id,
    //     userId: req.user._id,
    //   },
    // });
    // const isAlreadyApplied = isJobApplied.length > 0 ? true : false;
    // job.isAlreadyApplied = isAlreadyApplied;
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
    const job = await Job.findByIdAndDelete(req.params.job_id);
    res.status(200).json({
      success: true,
      message: "job deleted.",
    });
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
    const skills = "AngularJS, Spring or Struts, RESTful";
    //const skills = req.query.skills
    //console.log("skills",req.query)
    let results;
    try {
      results = await axios.get(`http://127.0.0.1:5000/jobs?skills=${skills}`);
      console.log("results======",results.data);
     /* {
        jobs: [
          {
            _id: '3246',
            available: true,
            company: 'The Brixton Group',
            description: 'Duration: 6+ MonthsCompensation: Open Requirements: 10+ years of full-stack Java development. Must have experience working with the Spring MVC Framework. Must have worked with Struts 2.0. Expert knowledge of JavaScript including Angular, Node and Ember. Local candidates preferred, in person interview required.',
            location: 'New York, NY',
            salary: 100000,
            skills: 'Java, Spring MVC, Struts 2, AngularJS',
            title: 'Lead Java Developer'
          }
        ]
      }*/
    } catch (err) {
      console.log(
        "Error while fetching the recommendation list from recommendation engine:",
        err
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results && results.data) {
      // Log the response from the recommendation engine
      //console.log("Recommendation engine response:", results.data);

      // Assuming results.data is already JSON, directly sending it
      res.status(200).json(results.data);
    } else {
      return res
        .status(500)
        .json({ message: "No data received from recommendation engine" });
    }
  } catch (error) {
    console.log("Error:", error);
    next(error);
  }
};
