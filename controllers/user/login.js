const { query } = require("../../lib/db");
const qs = require("qs");
const jwt = require("jsonwebtoken");
module.exports = async ctx => {

    const {email, password} = JSON.parse(ctx.request.body.data);
    const sql = `SELECT * FROM user WHERE email=? AND password=?`;
    const [row] = await query(sql, [email, password]);
    const userInfo = row;
    console.log(email, password);
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
    } else {
      //登录失败
      ctx.body = {
        state: 0,
        code: 400,
        msg: "登录失败"
      };
    }

}