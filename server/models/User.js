const mongoose = require("mongoose");

// bcrypt : 비밀번호 암호화
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt를 이용해 비밀번호 암호화

// jwt(json web token)
const jwt = require("jsonwebtoken");

// schema : 어떤 종류의 값이 들어가는지를 정의
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    type: Number,
    default: 0, // 0이면 user, 1이면 admin
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// password 암호화
// user 정보를 save하기 전에 동작하기
userSchema.pre("save", function (next) {
  // userSchema 정보
  let user = this;

  // password 변경 시 동작
  if (user.isModified("password")) {
    // bcrypt
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); // error

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err); // error
        user.password = hash; // 기존 passwrod -> hash 암호화
        next(); // join의 save 지점으로 돌아가기
      });
    });
  } else {
    next(); // join의 save 지점으로 돌아가기
  }
});

// comparePassword
userSchema.methods.comparePassword = function (password, callback) {
  // 기존 password -> hash 암호화 -> 일치하는지 확인
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err); // error
    callback(null, isMatch); // match
  });
};

// generateToken
userSchema.methods.generateToken = function (callback) {
  // userSchema 정보
  let user = this;

  // jwt를 이용해 token을 생성
  let token = jwt.sign(user._id.toString(), "secretToken");

  // token = user._id + "secretToken"
  user.token = token;

  user.save(function (err, user) {
    if (err) return callback(err); // error
    callback(null, user); // user
  });
};

// findByToken
userSchema.statics.findByToken = function (token, callback) {
  // userSchema 정보
  let user = this;

  // token을 복호화(decode)
  jwt.verify(token, "secretToken", function (err, decode) {
    // user id를 이용해 user를 찾고,
    // 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return callback(err); // error
      callback(null, user); // user
    });
  });
};

// model : schema를 통해 만드는 인스턴스, schema를 감싸주는 역할
const User = mongoose.model("User", userSchema);

// 다른 파일에서도 User를 사용할 수 있다.
module.exports = { User };
