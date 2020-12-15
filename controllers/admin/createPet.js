const {
    query
} = require("../../lib/db");

module.exports = async ctx => {
    console.log("执行到插入");
    
    const {
        name,
        species,
        animal,
        sex,
        age,
        weight,
        vaccine,
        exParasite,
        sterilization,
        organization,
    } = ctx.request.body.data;
    ctx.body = {
        state: 1,
        code: 200,
        msg: "新建成功"
    }
    const state = 0;
    
    console.log(name,
        species,
        animal,
        sex,
        age,
        weight,
        vaccine,
        exParasite,
        sterilization,
        organization, );
    if (animal == "cat") {
        console.log("我是cat");
        await query("insert into `cat` (`name`,`species`,`sex`,`age`,`weight`,`vaccine`,`exParasite`,`sterilization`,`organization`, `state`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [name, species, sex, age, weight, vaccine, exParasite, sterilization, organization, state]);
        
    } else {
        console.log("我是dog");
        await query("insert into `dog` ( `name`,`species`,`sex`,`age`,`weight`,`vaccine`,`exParasite`,`sterilization`,`organization`, `state`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [name, species, sex, age, weight, vaccine, exParasite, sterilization, organization, state]);
        
    }


    // const sql = `SELECT * FROM admin WHERE email=? AND password=?`;
    // const [row] = await query(sql, [email, password]);
    // // console.log(row);
    // const userInfo = row;
    // // console.log(Boolean(userInfo));
    // // console.log(email, password);
    // // console.log(row.id);
    // if (userInfo) {
    //   //登录成功

    //   // token
    //   const token = jwt.sign({ uId: userInfo.id }, 'ldk', {
    //     expiresIn: "500"
    //   });
    //   console.log(token);
    //   ctx.body = {
    //     state: 1,
    //     code: 200,
    //     msg: "登录成功",
    //     token

    //   };
    // } else {
    //   //登录失败
    //   ctx.body = {
    //     state: 0,
    //     code: 400,
    //     msg: "登录失败"
    //   };
    // }

}
