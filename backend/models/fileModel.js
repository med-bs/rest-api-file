const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    link: {
      type: String,
      required: [true, "Please add a link value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", fileSchema);
