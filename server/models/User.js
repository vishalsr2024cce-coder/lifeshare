import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bloodType: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: ['donor', 'hospital', 'admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
