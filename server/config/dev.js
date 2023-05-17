require("dotenv").config();

// Local 환경
module.exports = {
  mongoURI: process.env.MONGO_URI,
};
