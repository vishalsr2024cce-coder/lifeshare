import mongoose from 'mongoose';

const requestSchema = mongoose.Schema(
  {
    bloodType: {
      type: String,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: false,
    },
    urgency: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high', 'critical'],
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'in-progress', 'fulfilled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model('Request', requestSchema);
export default Request;
