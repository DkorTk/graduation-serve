const {
    query
} = require("../../lib/db");

module.exports = async ctx => {
    console.log('请求路径: ' + ctx.url);
    switch (ctx.url) {
        case '/createPet':
            addPet(ctx)
            break;
        case '/getPetList':
            getPetList(ctx).then(rest => {
                console.log(rest, '测试数据')
                ctx.body = {
                    data: rest,
                    state: 1,
                    code: 200,
                    msg: "获取宠物列表成功！"
                }
            })
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

function getPetList (ctx) {
    return new Promise((resolve, reject) => {
        const { animal } = ctx.request.body;
        // console.log(animal, 'ssss')

        if (animal == "cat") {
            // console.log("获取宠物猫列表");
            query(" SELECT c.name,c.species,c.sex,c.age,c.weight,c.vaccine,c.exParasite,c.sterilization,c.organization, c.state FROM cat c").then(rest => {
                console.log(rest)


                resolve('1111')
            });

        } else if (animal == "dog") {
            // console.log("获取宠物狗列表");
            query(" SELECT d.name,d.species,d.sex,d.age,d.weight,d.vaccine,d.exParasite,d.sterilization,d.organization, d.state FROM dog d").then(rest => {
                ctx.body = {
                    state: 1,
                    code: 200,
                    msg: "获取宠物列表成功！"
                }
                resolve()
            });
        }
        else {
            // console.log("获取全部列表");
            query(" SELECT c.name,c.species,c.sex,c.age,c.weight,c.vaccine,c.exParasite,c.sterilization,c.organization, c.state FROM cat c " +
                " UNION ALL " +
                " SELECT d.name,d.species,d.sex,d.age,d.weight,d.vaccine,d.exParasite,d.sterilization,d.organization, d.state FROM dog d").then(rest => {
                    ctx.body = {
                        state: 1,
                        code: 200,
                        msg: "获取宠物列表成功！"
                    }
                    resolve()
                });
        }
    }).catch(error => {
        reject(error)
    })
}

function setPet (ctx) {

}

function delPet (ctx) {

}
