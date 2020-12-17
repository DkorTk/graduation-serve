const {
    query
} = require("../../lib/db");

module.exports = ctx => {
    return new Promise((resolve, reject) => {

        console.log('请求路径: ' + ctx.url);
        switch (ctx.url) {
            case '/createPet':
                addPet(ctx).then(() => { resolve() })
                break;
            case '/getPetList':
                getPetList(ctx).then(() => { resolve() })
                break;
            case '/setPet':
                setPet(ctx).then(() => { resolve() })
                break;
            case '/delPet':
                delPet(ctx).then(() => { resolve() })
                break;
            default:
                break;
        }
    })
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
    })
}

function getPetList (ctx) {
    return new Promise((resolve, reject) => {
        const { animal, organ } = ctx.request.body;

        if (animal == "cat") {
            // console.log("获取宠物猫列表");
            let sql = " SELECT 'cat' as animal,c.id,c.name,c.species,c.sex,c.age,c.weight,c.vaccine,c.exParasite,c.sterilization,c.organization, c.state FROM cat c "
            let param = [organ]
            if (organ != '-1') {
                sql += " WHERE c.organization=? "
            }
            query(sql, param).then(rest => {
                console.log(rest)
                ctx.body = {
                    data: rest,
                    state: 1,
                    code: 200,
                    msg: "获取宠物猫列表成功！"
                }
                resolve()
            });

        } else if (animal == "dog") {
            // console.log("获取宠物狗列表");
            let sql = " SELECT 'dog' as animal,d.id,d.name,d.species,d.sex,d.age,d.weight,d.vaccine,d.exParasite,d.sterilization,d.organization, d.state FROM dog d "
            let param = [organ]
            if (organ != '-1') {
                sql += " WHERE d.organization=? "
            }

            query(sql, param).then(rest => {
                ctx.body = {
                    data: rest,
                    state: 1,
                    code: 200,
                    msg: "获取宠物狗列表成功！"
                }
                resolve()
            });
        }
        else if (animal == '-1') {
            // console.log("获取全部列表");
            let sqlCat = " SELECT 'cat' as animal,c.id,c.name,c.species,c.sex,c.age,c.weight,c.vaccine,c.exParasite,c.sterilization,c.organization, c.state FROM cat c "
            let sqlDog = " SELECT 'dog' as animal,d.id,d.name,d.species,d.sex,d.age,d.weight,d.vaccine,d.exParasite,d.sterilization,d.organization, d.state FROM dog d "
            if (organ != '-1') {
                sqlCat += ' WHERE c.organization=? '
                sqlDog += ' WHERE d.organization=? '
            }
            let param = [organ]

            query(sqlCat + " UNION ALL " + sqlDog, param).then(rest => {
                ctx.body = {
                    data: rest,
                    state: 1,
                    code: 200,
                    msg: "获取宠物列表成功！"
                }
                resolve()
            });
        }
    }).catch(error => {
        ctx.body = {
            state: 1,
            code: 400,
            msg: "获取宠物列表失败！"
        }
    })
}

function setPet (ctx) {
    return new Promise((resolve, reject) => {
        const { animal } = ctx.request.body;
        const { name, species, sex, age, weight, vaccine, exParasite, sterilization, organization, state, id } = ctx.request.body;

        if (animal == "cat") {
            // console.log("更新宠物猫");
            query(" UPDATE cat c SET c.name=?,c.species=?,c.sex=?,c.age=?,c.weight=?,c.vaccine=?,c.exParasite=?,c.sterilization=?,c.organization=?, c.state=? WHERE c.id=? ", [name, species, sex, age, weight, vaccine, exParasite, sterilization, organization, state, id]).then(rest => {
                // console.log(rest)
                ctx.body = {
                    state: 1,
                    code: 200,
                    msg: "更新宠物猫信息成功！"
                }
                resolve()
            });
        }
        else {
            // console.log("更新宠物狗");
            query(" UPDATE dog d SET d.name=?,d.species=?,d.sex=?,d.age=?,d.weight=?,d.vaccine=?,d.exParasite=?,d.sterilization=?,d.organization=?, d.state=? WHERE d.id=? ", [name, species, sex, age, weight, vaccine, exParasite, sterilization, organization, state, id]).then(rest => {
                // console.log(rest)
                ctx.body = {
                    state: 1,
                    code: 200,
                    msg: "更新宠物狗信息成功！"
                }
                resolve()
            });
        }
    }).catch(error => {
        ctx.body = {
            state: 1,
            code: 400,
            msg: "宠物信息更新失败！"
        }
    })
}

function delPet (ctx) {
    return new Promise((resolve, reject) => {
        const { animal, id } = ctx.request.body;

        if (animal == "cat") {
            // console.log("删除宠物猫");
            query(" DELETE FROM cat WHERE id=? ", [id]).then(rest => {
                // console.log(rest)
                ctx.body = {
                    state: 1,
                    code: 200,
                    msg: "删除宠物猫信息成功！"
                }
                resolve()
            });
        }
        else {
            // console.log("删除宠物狗");
            query(" DELETE FROM cat WHERE id=? ", [id]).then(rest => {
                // console.log(rest)
                ctx.body = {
                    state: 1,
                    code: 200,
                    msg: "删除宠物狗信息成功！"
                }
                resolve()
            });
        }
    }).catch(error => {
        ctx.body = {
            state: 1,
            code: 400,
            msg: "宠物信息删除失败！"
        }
    })
}
