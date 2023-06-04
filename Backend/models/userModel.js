const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    role: {
      type: String,
      default: "user",
    },
    gender: {
      type: String,
      default: "male",
    },
    mobile: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ['enabled', 'disabled'], 
      default: 'enabled',
    },
    userType:  {
      type: String,
      default: "",
    },
    // Teacher
    department: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
      default: "",
    },
    qualification: {
      type: String,
      default: "",
    },

    // Alumni
    degree: {
      type: String,
      default: "",
    },
    batch: {
      type: String,
      default: "",
    },
    passingYear: {
      type: String,
      default: "",
    },

    // Student
    university: {
      type: String,
      default: "",
    },
    major: {
      type: String,
      default: "",
    },
    semester: {
      type: String,
      default: "",
    },

    saved: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'post'
      }
    ],
    story: {
      type: String,
      default: "",
      maxlength: 200,
    },
    website: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('user', userSchema);