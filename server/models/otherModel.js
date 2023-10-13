const mongoose = require("mongoose");

const otherSchema = new mongoose.Schema(
  {
    aboutus: {
      about: String,
      photoa: Object,
    },
    contactus: {
      contact: String,
      photoc: Object,
    },

    parties: {
      party: String,
      photop: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Other", otherSchema);
