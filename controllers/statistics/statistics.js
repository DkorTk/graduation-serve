const { query } = require("../../lib/db");

module.exports = async ctx => {
  console.log('请求路径: ' + ctx.url);
  switch (ctx.url) {
    case '/getStatistics':
      await getStatistics(ctx)
      break;
    default:
      break;
  }
}

async function getStatistics (ctx) {
  let sql = " SELECT" +
    " `user`.*," +
    " animal.*," +
    " apply.*, " +
    " organ.* " +
    " FROM " +
    " ( SELECT COUNT( id ) `user` FROM USER ) `user`," +
    " (" +
    " SELECT" +
    "	sum( e.animal ) animal" +
    " FROM" +
    "	( SELECT COUNT( d.id ) animal FROM `dog` d UNION ALL SELECT count( c.id ) animal FROM cat c ) e " +
    " ) animal," +
    " ( SELECT count( f.id ) apply FROM apply f ) apply," +
    " ( SELECT count( i.id ) organ FROM organ i ) organ"

  try {
    let rest = await query(sql);
    ctx.body = {
      data: rest,
      state: 1,
      code: 200,
      msg: "获取统计查询成功！",
    };
  }
  catch (e) {
    ctx.body = {
      state: 0,
      code: 400,
      msg: "获取统计查询失败！"
    };
  }
}

