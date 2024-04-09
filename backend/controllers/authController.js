const User = require("../models/userModel");
const userjobMapping = require("../models/userjobMappingModel");
const ErrorResponse = require("../utils/errorResponse");
const jobs = require("../models/jobModel");

exports.signup = async (req, res, next) => {
  const { emailId } = req.body;
  const userExist = await User.findOne({ emailId });
  if (userExist) {
    return next(new ErrorResponse("E-mail already registred", 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { emailId, password } = req.body;
    //validation
    if (!emailId) {
      return next(new ErrorResponse("please add an emailId", 403));
    }
    if (!password) {
      return next(new ErrorResponse("please add a password", 403));
    }

    //check user emailId
    const user = await User.findOne({ emailId });
    if (!user) {
      return next(new ErrorResponse("invalid credentials", 400));
    }
    //check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("invalid credentials", 400));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({
      success: true,
      role: user.role,
      token: token,
    });
};

// log out
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

// user profile
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};

exports.appliedJobsList = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const JobList = userjobMapping.find({
    $where: {
      userId: req.user.id,
    },
  });

  let JobIdList = [];
  JobIdList.forEach((item) => {
    JobIdList.push(JobIdList.jobId);
  });

  const uniqueJobList = new Set(JobIdList);

  let jobList = [];

  for (const id of uniqueJobList) {
    const job = await jobs.find().sort({ createdAt: -1 });
    jobList.push(job);
  }

  delete user.jobsHistory;
  user.jobsHistory = jobList;

  res.status(200).json({
    success: true,
    user,
  });
};
