const AppError = require('../helpers/errorHandler');
const Cart = require('../models/cartSchema');

exports.creatCart = async (req, res, next) => {
  const {
    vehicle_details,
    contact_details,
    appointment_time,
    appointment_date,
  } = req.body;
  try {
    const newCart = await Cart.create(
      vehicle_details,
      contact_details,
      appointment_time,
      appointment_date
    );
    res.status(201).json({
      status: 'Success',
      data: {
        newCart,
      },
    });
  } catch (error) {
    return next(new AppError('Failed to create cart, please try again.', 500));
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      status: 'success',
      data: {
        updatedCart,
      },
    });
  } catch (error) {
    return next(new AppError('Failed to create cart, please try again.', 500));
  }
};
