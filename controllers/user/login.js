const { query } = require("../../lib/db");
module.exports = async ctx => {
    const {email, password} = ctx.request.body;
    const sql = `SELECT * FROM user WHERE email=? AND password=?`;
    const [row] = await query(sql, [email, password]);
    const userInfo = row;
    if (userInfo) {
      //登录成功
    //   const token = jsonwebtoken.sign({ uId: userInfo.id }, SECRET, {
    //     expiresIn: "2h"
    //   });
      ctx.body = {
        state: 1,
        code: 200,
        // data: {
        //   token
        // }
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