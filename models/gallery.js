const { Schema, model } = require("mongoose");

const gallerySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  date: Date,
});

module.exports = model("Gallery", gallerySchema);
