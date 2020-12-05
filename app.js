const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require("koa-body");


// 引入lib中的具体执行逻辑
const login = require("./controllers/user/login");
const signin = require("./controllers/user/signin")

const app = new Koa();
const router = new KoaRouter();
app.use(
    KoaBody({
      multipart: true
    })
  );
// 静态资源
app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}))

// 动态资源
router.post('/dk1', async ctx => {
    console.log(ctx.request.body);
    ctx.body = "哈喽，我是1号"
})

router.post('/login', login);
router.post('/signin', signin);

app.use(router.routes());
app.listen(8088);