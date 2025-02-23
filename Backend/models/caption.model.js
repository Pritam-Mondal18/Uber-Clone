const mongoose = require("mongoose");
const bcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const captionSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 charecters long"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last name must be at least 3 charecters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  sockedId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehical: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 charecters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 charecters long"],
    },
    capacity: {
      type: Number,
      required: true,
    },
    vehicalType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", auto],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captionSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captionSchema.methods.comparePassword = async function (password) {
  return await bcypt.compare(password, this.password);
};

captionSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captionModel = mongoose.model("caption", captionSchema);

module.exports = captionModel;
