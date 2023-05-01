// express : Node.js를 위한 빠르고, 개방적인 간결한 웹 프레임워크
const express = require("express");
const app = express(); // new express app

// bodyParser : API 요청에서 받은 body 값을 파싱하는 역할
// body-parser 미사용 시 Undefined Error 발생
const bodyParser = require("body-parser");
// bodyParser를 통해 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

// cookieParser : 요청된 cookie를 쉽게 추출할 수 있도록 도와주는 미들웨어
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// mongoose : Node.js와 MongoDB를 연결하는 ODM
// ODM(Object Document Mapping) : 객체와 문서를 1대 1로 매칭하는 역할
const mongoose = require("mongoose");

// config : MongoDB 환경 변수 Key 설정
// config.mongoURI
const config = require("./config/key");

// mongoose connect
mongoose
  .connect(config.mongoURI, {
    // error 방지
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected")) // connect
  .catch((err) => console.log(err)); // error

// routes
app.use("/api/user", require("./routes/user"));

// port setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000; // backend server port

// port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
