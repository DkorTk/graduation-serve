const Koa = require('koa');
// const KoaStaticCache = require('koa-static-cache');
const serve = require("koa-static");
const KoaRouter = require('koa-router');
const KoaBody = require("koa-body");


// 引入lib中的具体执行逻辑

// organ
const organ = require("./controllers/organ/organ")


// user
const login = require("./controllers/user/login");
const signin = require("./controllers/user/signin")


// admin
const adminLogin = require("./controllers/admin/login")
const createPet = require("./controllers/admin/pet")
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

// organ
router.post('/addOrgan', organ);
router.post('/getOrganList', organ);
router.post('/setOrgan', organ);
router.post('/delOrgan', organ);


// user
router.post('/login', login);
router.post('/signin', signin);
router.post('/getUserList', signin)
router.post('/setUser', signin)
router.post('/delUser', signin)


// admin
router.post('/adminLogin', adminLogin);
// petManage
router.post('/createPet', createPet);
router.post('/getPetList', createPet);
router.post('/setPet', createPet);
router.post('/delPet', createPet);

//上传dog图
router.post('/uploadImage', uploadImage);
// 上传cat图
router.post('/catImage', catImage);

app.use(router.routes());
app.listen(8088);