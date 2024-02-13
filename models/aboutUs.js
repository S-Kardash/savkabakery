const { Schema, model } = require("mongoose");

const aboutUsSchema = new Schema({
  description: { type: String, required: true },
});

module.exports = model("AboutUs", aboutUsSchema);
