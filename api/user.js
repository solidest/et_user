//user.js
//用户管理微服务
module.exports = function user(options) {



    this.add({srv:'user', fun:'create'}, create);
    this.add({srv:'user', fun:'remove'}, remove);
    this.add({srv:'user', fun:'update'}, update);
    this.add({srv:'user', fun:'getlist'}, getlist);
    this.add({srv:'user', fun:'getone'}, getone);

    //创建新用户
    function create(msg, reply) {
        if(msg.username && msg.password) {
            const user = this.make('user');
            user.username = msg.username;
            user.password = msg.password;
            user.save$(async (err, data) => {
                return new Promise(function(resolve, reject) {
                    if(err) {
                        reply(err);
                        reject();
                    }
                    else {
                        reply( { userid: data.id } );
                        resolve();
                    }
                });
            });
        }
        else
            reply({errorcode: 400, error:'参数错误'});
    }

    //删除用户
    function remove(msg, reply) {
        if(msg.userid){
            var user = this.make('user')
            user.remove$( msg.userid, (async (err, data) => {
                return new Promise(function(resolve, reject) {
                    if(err) {
                        reply(err);
                        reject();
                    }
                    else {
                        reply( { userid: msg.userid } );
                        resolve();
                    }
                });
            }));
        }
        else
            reply({errorcode: 400, error:'参数错误'});
    }

    //更新用户名或口令
    function update(msg, reply) {
        if(msg.userid) {
            var user = this.make('user');
            var newuser = this.make('user');
            user.load$( msg.userid, (async (err, data) => {
                return new Promise(function(resolve, reject) {
                    if(err) {
                        reply(err);
                        reject();
                    }
                    else {
                        if(data) {
                            newuser.id = msg.userid;
                            if(msg.username) 
                                newuser.username = msg.username;
                            else
                                newuser.username = data.username;
                            if(msg.password) 
                                newuser.password = msg.password;
                            else
                                newuser.password = data.password;
                                
                            newuser.save$(async (err, res) => {
                                return new Promise(function(resolve, reject) {
                                    if(err) {
                                        reply(err);
                                        reject();
                                    }
                                    else {
                                        reply( { userid: newuser.id } );
                                        resolve();
                                    }
                                });
                            });                          
                        }
                        else {
                            reply({errorcode: 404, error:'未找到匹配的用户id'});
                        }
                        resolve();
                    }
                });
            }));
        }
        else
            reply({errorcode: 400, error:'参数错误'});
    }

    //取全部用户列表
    function getlist(msg, reply) {
        const user = this.make('user');
        user.list$({}, async (err, list) => {
            return new Promise(function(resolve, reject) {
                if(err) {
                    reply(err);
                    reject();
                }
                else {
                    list.forEach(function(data){
                        data.userid = data.id;
                        delete data.id;
                        delete data.entity$;
                      });
                    reply(list);
                    resolve();
                }
            });
        });
    }

    //取某一个用户的信息
    function getone(msg, reply) {
        if(msg.userid){
            var user = this.make('user')
            user.load$( msg.userid, (async (err, data) => {
                return new Promise(function(resolve, reject) {
                    if(err) {
                        reply(err);
                        reject();
                    }
                    else {
                        if(data) {
                            data.userid = data.id;
                            delete data.id;
                            delete data.entity$;
                            reply(data);                            
                        }
                        else {
                            reply({errorcode: 404, error:'未找到匹配的用户id'});
                        }

                        resolve();
                    }
                });
            }));
        }
        else
            reply({errorcode: 400, error:'参数错误'});
    }


  }