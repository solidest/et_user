//api.js
//用户管理api
/**
 * @apiDefine userGroup 用户管理
 */

'use strict';


const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const koaBody = require('koa-body');
const Seneca = require('seneca')();
Seneca.use('user').listen({type: 'tcp', port: 4000, pin: {srv:'user'}});
const srv_user = Seneca.client({type: 'tcp', pin: {srv:'user'}});

/**
 * @apiVersion 0.1.0
 * @api {post} /users/ 新建用户
 * @apiName users-new
 * @apiGroup userGroup
 *
 * @apiParam {string} username 用户名
 * @apiParam {string} password 用户口令
 * @apiParam {string} [ugroupid] 所属的用户组
 *
 * @apiSuccess (Success 200) {String} userid 用户id标识
 * 
 * @apiParamExample {json} Request-Example:
 *    {
 *        "username": "张三"，
 *        "password": "123abcdf!"
 *    }
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userid": "192846732874"
 *     }
 */
router.post('/users/', koaBody(), async (ctx) => {

    //console.log(ctx.request.body);
    return new Promise(function(resolve, reject) {
        srv_user.act({srv:'user', fun:'create'}, ctx.request.body, function(err, res){
            if(err) {
                console.log(err);
                ctx.response.body =  err;
                reject();
            }
            else {
                ctx.response.body = res;
                resolve();
            }
        });
    });
});

/**
 * @apiVersion 0.1.0
 * @api {delete} /users/ 删除用户
 * @apiName users-remove
 * @apiGroup userGroup
 *
 * @apiParam {string} userid 用户id标识
 *
 * @apiSuccess (Success 200) {String} userid 已经删除用户的id标识
 */
router.delete('/users/', koaBody(), async (ctx) => {
    return new Promise(function(resolve, reject) {
        srv_user.act({ srv:'user', fun:'remove'}, ctx.request.body, function(err, res){
            if(err) {
                console.log(err);
                ctx.response.body =  err;
                reject();
            }
            else {
                ctx.response.body = res;
                resolve();            
            }
        });
    });
});

 // 调用路由中间件
app.use(router.routes());

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
});