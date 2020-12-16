const {
    query
} = require("../../lib/db");

module.exports = async ctx => {
    console.log("执行到插入");
    switch (ctx.url) {
        case '/createPet':
            addPet(ctx)
            break;

        default:
            break;
    }
}

function addPet (ctx) {
    return new Promise((resolve, reject) => {
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
            organization);
        if (animal == "cat") {
            console.log("我是cat");
            query("insert into `cat` (`name`,`species`,`sex`,`age`,`weight`,`vaccine`,`exParasite`,`sterilization`,`organization`, `state`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [name, species, sex, age, weight, vaccine, exParasite, sterilization, organization, state]).then(rest => {
                    resolve()
                });;

        } else {
            console.log("我是dog");
            query("insert into `dog` ( `name`,`species`,`sex`,`age`,`weight`,`vaccine`,`exParasite`,`sterilization`,`organization`, `state`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [name, species, sex, age, weight, vaccine, exParasite, sterilization, organization, state]).then(rest => {
                    resolve()
                });
        }
    }).catch(error => {
        reject(error)
    })
}

function getPet () {

}

function setPet () {

}

function delPet () {

}
