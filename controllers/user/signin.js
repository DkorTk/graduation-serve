const { query } = require("../../lib/db");
const { uid } = require("uid")
module.exports = async ctx => {
    const {
        email,
        password,
        nickname
    } = ctx.request.body;
    //插入注册数据
    let id = uid();
    // const sql = "insert into `user` (`id`,`username`, `password`, `nickname`) values (?,?, ?, ?)";
    await query("insert into `user` (`id`,`email`, `password`, `nickname`) values (?, ?, ?, ?)", [id, email, password, nickname]);
    
    
    const [row] = await query(`SELECT * FROM user WHERE id=?`,id);
    console.log(row);
    const userInfo = row;
    if (userInfo) {
        //注册成功
        //   const token = jsonwebtoken.sign({ uId: userInfo.id }, SECRET, {
        //     expiresIn: "2h"
        //   });
        ctx.body = {
            state: 1,
            code: 200,
            msg: "注册成功",
            // data: {
            //   token
            // }
        };
    } else {
        //登录失败
        ctx.body = {
            state: 0,
            code: 400,
            msg: "注册失败"
        };
    }
}