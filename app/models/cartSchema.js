const mongoose = require('mongoose');
const { isEmail } = require('validator');

const emailValidator = function (el) {
  return isEmail(el);
};

// const cartSchema = new mongoose.Schema({
//   vehicle_details: [
//     {
//       make: {
//         type: String,
//         required: [true, 'Please enter the vehicle make'],
//         trim: true,
//       },
//       year: {
//         type: Number,
//         required: [true, 'Please enter the vehicle year'],
//         trim: true,
//       },
//       model: {
//         type: String,
//         required: [true, 'Please enter the vehicle year'],
//       },
//       millage: {
//         type: Number,
//         trim: true,
//       },
//       service_required: [
//         {
//           type: String,
//           required: [true, 'Please enter the service for required'],
//         },
//       ],
//     },
//   ],
//   appointment_date: {
//     type: Date,
//     required: [true, 'Please a date for your appointment'],
//   },
//   appointment_time: {
//     type: Date,
//     required: [true, 'Please a time for your appointment'],
//   },
//   contact_details: {
//     customer_name: {
//       type: String,
//       required: [true, "Please enter customen's name for our record."],
//       trim: true,
//     },
//     customer_email: {
//       type: String,
//       lowercase: true,
//       validate: {
//         validator: [emailValidator, 'Please enter a correct Email.'],
//       },
//     },
//     customer_phone_number: {
//       type: Number,
//       min: [7, 'Phone number is too short.'],
//       required: [true, 'Please enter a valid phone number.'],
//     },
//     additional_message: {
//       type: String,
//       maxlength: [1000, 'Message limit exceeded.'],
//     },
//   },
//   cart_total: Number,
// });

const cartSchema = new mongoose.Schema({
  vehicle_details: [
    {
      make: {
        type: String,
        required: [true, 'Please enter the vehicle make'],
        trim: true,
      },
      year: {
        type: Number,
        required: [true, 'Please enter the vehicle year'],
        trim: true,
      },
      model: {
        type: String,
        required: [true, 'Please enter the vehicle year'],
      },
      millage: {
        type: Number,
        trim: true,
      },
      service_required: [{ type: Schema.Types.ObjectId, ref: 'Services' }],
    },
  ],
  appointment_date: {
    type: Date,
    required: [true, 'Please a date for your appointment'],
  },
  appointment_time: {
    type: Date,
    required: [true, 'Please a time for your appointment'],
  },
  contact_details: {
    customer_name: {
      type: String,
      required: [true, "Please enter customen's name for our record."],
      trim: true,
    },
    customer_email: {
      type: String,
      lowercase: true,
      validate: {
        validator: [emailValidator, 'Please enter a correct Email.'],
      },
    },
    customer_phone_number: {
      type: Number,
      min: [7, 'Phone number is too short.'],
      required: [true, 'Please enter a valid phone number.'],
    },
    additional_message: {
      type: String,
      maxlength: [1000, 'Message limit exceeded.'],
    },
  },
  cart_total: Number,
});

cartSchema.pre('save', function (next) {
  this.cart_total = this.vehicle_details.service_required.reduce(function (
    total,
    index
  ) {
    return total + index.pricing;
  },
  0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
