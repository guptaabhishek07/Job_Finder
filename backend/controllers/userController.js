const User = require("../models/userModel");
const userjobMappingModel = require("../models/userjobMappingModel");
const ErrorResponse = require("../utils/errorResponse");

//load all users
exports.allUsers = async (req, res, next) => {
  //enable pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();

  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//show single user
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//edit user
exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.user_id);
    res.status(200).json({
      success: true,
      message: "user deleted.",
    });
  } catch (error) {
    next(error);
  }
};

//jobs history
exports.applyJobByUser = async (req, res, next) => {
  const { title, description, salary, location, jobId, userId } = req.body;

  try {
    const currentUser = await User.findOne({ _id: userId});
    if (!currentUser) {
      return next(new ErrorResponse("You must log In", 401));
    } else {
      await userjobMappingModel.create({
        jobId: jobId,
        userId: userId,
      });
    }
    res.status(200).json({
      success: true,
      currentUser,
      isApplied : true
    });
    next();
  } catch (error) {
    return next(error);
  }
};
