const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 16,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 7,
  },
  lastname: {
    type: String,
    maxlength: 10,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    //비밀번호 암호화
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callBack) {
  const user = this;
  bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
    if (err) return callBack(err);
    return callBack(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callBack) {
  const user = this;
  //jsonwebtoken을 이용해서 웹토큰 생성
  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save((err, user) => {
    if (err) return callBack(err);
    return callBack(null, user);
  });
};

userSchema.statics.findByToken = function (token, callBack) {
  const user = this;
  //토큰을 decode
  jwt.verify(token, "secretToken", (err, decode) => {
    //유저 아이디를 이용해서 유저를 찾은 뒤
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decode, token: token }, (err, user) => {
      if (err) return callBack(err);
      return callBack(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
