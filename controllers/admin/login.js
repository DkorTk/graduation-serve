const { query } = require("../../lib/db");
const qs = require("qs");
const jwt = require("jsonwebtoken");
module.exports = ctx => {
  return new Promise((resolve, reject) => {
    console.log("执行到这了", ctx);
    // console.log(ctx.request.body);
    const { email, password } = ctx.request.body;
    // console.log(email, password);
    const sql = `SELECT * FROM admin WHERE email=? AND password=?`;
    query(sql, [email, password]).then(rest => {
      // const [res] = rest
      console.log(rest, '管理员登录')

      const userInfo = rest;
      // console.log(Boolean(userInfo));
      // console.log(email, password);
      // console.log(row.id);
      if (userInfo) {
        //登录成功

        // token
        const token = jwt.sign({ uId: userInfo.id }, 'ldk', {
          expiresIn: "500"
        });
        console.log(token);
        ctx.body = {
          state: 1,
          code: 200,
          msg: "登录成功",
          token
        };
        resolve()
      } else {
        //登录失败
        ctx.body = {
          state: 0,
          code: 400,
          msg: "登录失败"
        };
      }

    });
  }).catch(error => {
    //登录失败
    ctx.body = {
      state: 0,
      code: 400,
      msg: "登录失败"
    };
  })
}