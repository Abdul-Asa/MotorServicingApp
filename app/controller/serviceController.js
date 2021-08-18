const Service = require("../models/servicesModel");
const AppError = require("../helpers/errorHandler");

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({});
    return res.status(200).json({ status: "success", data: { services } });
  } catch (error) {
    next(new AppError("Server Error", 500));
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    return res.status(200).json({ status: "success", data: { service } });
  } catch (error) {
    next(new AppError("Server Error", 500));
  }
};
