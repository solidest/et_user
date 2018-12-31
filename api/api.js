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
Seneca.use(require('seneca-entity'));
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
 *        "userid":"e2tltr"
 *    }
 * 
 * @apiError (Error) {Number} errorcode 错误代码
 * @apiError (Error) {String} error 错误信息
 * @apiErrorExample  {json} Response-Error-Example:
 *    HTTP/1.1 400 Bad Request
 *    {
 *        "errorcode":400,
 *        "error":"参数错误"
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
 * @api {put} /users/ 更新用户
 * @apiName users-update
 * @apiGroup userGroup
 *
 * @apiParam {String} userid 用户id
 * @apiParam {String} username 用户名
 * @apiParam {String} password 用户口令
 * @apiParamExample {json} Request-Body-Example:
 *    {
 *        "userid": "ajdjk98",
 *        "username": "张三"，
 *        "password": "123abcdf!"
 *    }
 *  
 * @apiSuccess (Success) {String} userid 用户id标识
 * @apiSuccessExample {json} Response-Success-Example:
 *    HTTP/1.1 200 OK
 *    {
 *        "userid":"e2tltr"
 *    }
 * 
 * @apiError (Error) {Number} errorcode 错误代码
 * @apiError (Error) {String} error 错误信息
 * @apiErrorExample  {json} Response-Error-Example:
 *    HTTP/1.1 400 Bad Request
 *    {
 *        "errorcode":400,
 *        "error":"参数错误"
 *    }
 */
router.put('/users/', koaBody(), async (ctx) => {
    return new Promise(function(resolve, reject) {
        srv_user.act({srv:'user', fun:'update'}, ctx.request.body, function(err, res){
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
 *        "userid":"e2tltr"
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
                ctx.response.status = 200;
                ctx.response.body = res;
                resolve();
            }
        });
    });
});

/**
 * @apiVersion 0.1.0
 * @api {get} /users/ 获取全部用户
 * @apiName users-getlist
 * @apiGroup userGroup
 *
 *
 * @apiSuccess (Success) {String} userid 用户id
 * @apiSuccess (Success) {String} username 用户名
 * @apiSuccess (Success) {String} password 用户口令
 * @apiParamExample {json} Request-Body-Example:
 *    [
 *        {
 *            "userid": "ajdjk98",
 *            "username": "张三"，
 *            "password": "123abcdf!"
 *        },
 *        {
 *            "userid": "fjk23id",
 *            "username": "李四"，
 *            "password": "aaa23fkj"
 *        }
 *    ]

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
router.get('/users/', async (ctx) => {
    return new Promise(function(resolve, reject) {
        srv_user.act({ srv:'user', fun:'getlist' }, function(err, res){
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
                ctx.response.status = 200;
                ctx.response.body = res;
                resolve();
            }
        });
    });
});

/**
 * @apiVersion 0.1.0
 * @api {get} /users/{userid} 获取指定用户
 * @apiName users-getone
 * @apiGroup userGroup
 *
 * @apiParam {string} userid 【URL路径参数】用户id标识
 *
 * @apiSuccess (Success) {String} userid 用户id
 * @apiSuccess (Success) {String} username 用户名
 * @apiSuccess (Success) {String} password 用户口令
 * @apiParamExample {json} Request-Body-Example:
 *    {
 *        "userid": "ajdjk98",
 *        "username": "张三"，
 *        "password": "123abcdf!"
 *    }
 * 
 * @apiError (Error) {Number} errorcode 错误代码
 * @apiError (Error) {String} error 错误信息
 * @apiErrorExample  {json} Response-Error-Example:
 *    HTTP/1.1 404 Not Found
 *    {
 *        "errorcode":404,
 *        "error":"未找到匹配的用户id"
 *    }
 */
router.get('/users/:id', async (ctx) => {
    return new Promise(function(resolve, reject) {
        srv_user.act({ srv:'user', fun:'getone', userid:ctx.params.id }, function(err, res){
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