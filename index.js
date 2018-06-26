const Router = require('koa-router');
const KoaStatic = require('koa-static');
const path = require('path');
const bodyparser = require('koa-bodyparser');
const Koa = require('koa');

module.exports = class npmdemozj {
    constructor() {
        this.cors = '*'
    }
    manage() {
        const router = new Router();
        const root = path.join(__dirname, '../ui/site/') // 静态页面的路径
        router.post('/save', async ctx => {
            const cors = ctx.request.body.cors;
            this.cors = cors;
            ctx.body = {
                status: 200,
                msg: 'OK'
            }
        })
        router.get('/cors', async ctx => {
            ctx.body = {
                status: 200,
                msg: 'OK',
                data: {
                    cors: this.cors
                }
            }
        })
        const app = new Koa()
        app
            .use(bodyparser())
            .use(router.routes())
            .use(router.allowedMethods())
            .use(KoaStatic(root))
        return app;
    }
    proxy() {
        return async(ctx, next) => {
            ctx.res.setHeader('Access-Control-Allow-Origin', this.cors || '*');
            await next()
        }
    }
}