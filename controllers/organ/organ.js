const { query } = require("../../lib/db");

module.exports = async ctx => {
  console.log('请求路径: ' + ctx.url);
  switch (ctx.url) {
    case '/addOrgan':
      await addOrgan(ctx)
      break;
    case '/getOrganList':
      await getOrganList(ctx)
      break;
    case '/setOrgan':
      await setOrgan(ctx)
      break;
    case '/delOrgan':
      await delOrgan(ctx)
      break;
    default:
      break;
  }
}

async function addOrgan (ctx) {
  const { name, account, password } = ctx.request.body;
  let sql = " insert into organ (name`, `account`, `password`) values (?, ?, ?, ?) ";
  let param = [name, account, password]

  try {
    await query(sql, param);
    ctx.body = {
      state: 1,
      code: 200,
      msg: "机构添加成功",
    };
  }
  catch (e) {
    ctx.body = {
      state: 0,
      code: 400,
      msg: "机构添加失败"
    };
  }
}

async function getOrganList (ctx) {
  let sql = " SELECT id,name,`account`,password FROM organ "
  const [row] = await query(sql);
  console.log(row, '获取机构列表');
  const organList = row;
  if (organList) {
    ctx.body = {
      data: organList,
      state: 1,
      code: 200,
      msg: "获取机构列表成功！",
    };
  } else {
    ctx.body = {
      state: 0,
      code: 400,
      msg: "获取机构列表失败！"
    };
  }
}

async function setOrgan (ctx) {
  const { name, account, password, id } = ctx.request.body;
  let sql = " UPDATE organ SET name=?,account=?,`password`=? WHERE id=?"

  try {
    await query(sql, [name, account, password, id]);
    ctx.body = {
      state: 1,
      code: 200,
      msg: "更新机构信息成功！",
    };
  }
  catch (e) {
    ctx.body = {
      state: 0,
      code: 400,
      msg: "更新机构信息失败！"
    };
  }
}

async function delOrgan (ctx) {
  const { id } = ctx.request.body;
  let sql = " DELETE FROM organ WHERE id=?"

  try {
    await query(sql, [id]);
    ctx.body = {
      state: 1,
      code: 200,
      msg: "删除机构信息成功！",
    };
  }
  catch (e) {
    ctx.body = {
      state: 0,
      code: 400,
      msg: "删除机构信息失败！"
    };
  }
}

