const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    // Objek relasi
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add contact Email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add contact Phone Number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
