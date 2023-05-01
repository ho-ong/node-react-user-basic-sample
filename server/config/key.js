// MongoDB 환경 변수 Key 설정
if (process.env.NODE_ENV == "production") {
  module.exports = require("./prod"); // deploy
} else {
  module.exports = require("./dev"); // local
}
