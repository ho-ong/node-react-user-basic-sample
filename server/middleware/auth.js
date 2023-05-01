const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리하기
  // 클라이언트 cookie에서 token을 가져오기
  let token = req.cookies.auth;

  // token을 복호화
  User.findByToken(token, (err, user) => {
    if (err) throw err; // error

    // user가 없을 경우 error
    if (!user) return res.json({ isAuth: false, error: true });

    // user가 있을 경우
    // token, user 정보를 사용할 수 있도록 넣기
    req.token = token;
    req.user = user;
    next(); // auth의 save 지점으로 돌아가기
  });
};

module.exports = { auth };
