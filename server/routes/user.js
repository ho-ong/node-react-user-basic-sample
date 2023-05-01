const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

// HOC(Auth)
// Auth : 사용자에 따라 페이지 접근 권한을 다르게 부여
router.get("/auth", auth, (req, res) => {
  // Authentication = True
  // 어떤 페이지에서든 user 정보 사용 가능
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

// 회원가입
router.post("/join", (req, res) => {
  // 필요한 정보들을 클라이언트에서 가져오기 -> DB에 정보들을 넣기
  const user = new User(req.body);
  // user 정보 저장
  user.save((err, user) => {
    if (err) return res.json({ success: false, err }); // error
    return res.status(200).json({
      success: true, // success
    });
  });
});

// 로그인
router.post("/login", (req, res) => {
  // email을 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      // user가 없을 경우
      return res.json({
        loginSuccess: false,
        message: "사용자가 없습니다.",
      });

    // email이 DB에 있을 경우 password가 일치하는지 확인하기
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        // password가 일치하지 않을 경우
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });

      // password가 일치하면 token을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err); // error

        // token을 저장 (쿠키, 세션, 로컬 스토리지 등)
        // cookie에 token을 저장
        res.cookie("auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
        // cookie에 tokenExp을 저장
        // res.cookie("authExp", user.tokenExp);
      });
    });
  });
});

// 로그아웃
router.get("/logout", auth, (req, res) => {
  // token을 삭제
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err }); // error
    return res.status(200).send({
      success: true, // success
    });
  });
});

module.exports = router;
