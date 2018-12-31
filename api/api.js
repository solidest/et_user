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
 * @apiParam {String} username 用户名
 * @apiParam {String} password 用户口令
 * @apiParam {String} [ugroupid] 所属的用户组
 * @apiParamExample {json} Request-Body-Example:
 *    {
 *        "username": "张三"，
 *        "password": "123abcdf!"
 *    }
 *  
 * @apiSuccess (Success) {String} userid 用户id标识
 * @apiSuccessExample {json} Response-Success-Example:
 *    HTTP/1.1 200 OK
 *    {
 *        "userid": "192846732874" 
 *    }
 * 
 * @apiError (Error) {Number} errorcode 错误代码
 * @apiError (Error) {String} error 错误信息
 * @apiErrorExample  {json} Response-Error-Example:
 *    HTTP/1.1 400 Bad Request
 *    {
 *        "errorcode":400,
 *        "error":"必须提供用户名与口令"
 *    }
 */
router.post('/users/', koaBody(), async (ctx) => {
    return new Promise(function(resolve, reject) {
        srv_user.act({srv:'user', fun:'create'}, ctx.request.body, function(err, res){
            if(err) {
                console.log(err);
                reject();
            }
            if(res.error) {
                console.log(res);
                ctx.response.status = res.errorcode || 500;
                ctx.response.body = res;
                resolve();
            }       
            else {
                ctx.response.status = 200;
                ctx.response.body = res;
                resolve();
            }
        });
    });
});

/**
 * @apiVersion 0.1.0
 * @api {delete} /users/{userid} 删除用户
 * @apiName users-remove
 * @apiGroup userGroup
 *
 * @apiParam {string} userid 【URL路径参数】用户id标识
 *
 * @apiSuccess (Success) {String} userid 已经删除用户的id标识
 * @apiSuccessExample {json} Response-Success-Example:
 *    HTTP/1.1 200 OK
 *    {
 *        "userid": "192846732874" 
 *    }
 * 
 * @apiError (Error) {Number} errorcode 错误代码
 * @apiError (Error) {String} error 错误信息
 * @apiErrorExample  {json} Response-Error-Example:
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *        "errorcode":500,
 *        "error":"未知错误"
 *    }
 */
router.delete('/users/:id', async (ctx) => {
    return new Promise(function(resolve, reject) {
        srv_user.act({ srv:'user', fun:'remove', userid:ctx.params.id}, function(err, res){
            if(err) {
                console.log(err);
                reject();
            }
            if(res.error) {
                ctx.response.status = res.errorcode || 500;
                ctx.response.body = res;
                resolve();
            }       
            else {
                console.log(res);
                ctx.response.status = 200;
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