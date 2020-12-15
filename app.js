const Koa = require('koa');
// const KoaStaticCache = require('koa-static-cache');
const serve = require("koa-static");
const KoaRouter = require('koa-router');
const KoaBody = require("koa-body");


// 引入lib中的具体执行逻辑

// user
const login = require("./controllers/user/login");
const signin = require("./controllers/user/signin")


// admin
const adminLogin = require("./controllers/admin/login")
const createPet = require("./controllers/admin/createPet")
const uploadImage = require("./controllers/admin/uploadImage")
const catImage = require("./controllers/admin/catImage")  

const app = new Koa();
const router = new KoaRouter();
app.use(
    KoaBody({
      multipart: true
    })
  );
// 静态资源
app.use(serve(__dirname + "./static"));
// app.use(KoaStaticCache('./image', {
//     prefix: '/image',
//     gzip: true,
//     dynamic: true
// }))

// 动态资源
// router.post('/dk1', async ctx => {
//     console.log(ctx.request.body);
//     ctx.body = "哈喽，我是1号"
// })

// user
router.post('/login', login);
router.post('/signin', signin);

// admin
router.post('/adminLogin', adminLogin);
router.post('/createPet', createPet);

//上传dog图
router.post('/uploadImage', uploadImage);
// 上传cat图
router.post('/catImage', catImage);

app.use(router.routes());
app.listen(8088);