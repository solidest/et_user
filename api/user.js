//user.js
//用户管理微服务
module.exports = function auth(options) {

    this.add({srv:'user', fun:'create'}, create);
    this.add({srv:'user', fun:'remove'}, remove);
    this.add({srv:'user', fun:'update'}, update);
    this.add({srv:'user', fun:'getlist'}, getlist);
    this.add({srv:'user', fun:'getone'}, getone);

    function create(msg, reply) {
        console.log("user/create invoke by " + JSON.stringify(msg));
        if(msg.username && msg.password)
            reply({userid: 'new user id'});
        else
            reply({errorcode: 400, error:'必须提供用户名与口令'});
    }

    function remove(msg, reply) {
        console.log("user/remove invoke by " + JSON.stringify(msg));
        if(msg.userid)
            reply({userid: 'deleted user id'});
        else
            reply({errorcode: 500, error:'未知错误'});
    }

    function update(msg, reply) {
        console.log("user/update invoke by " + JSON.stringify(msg));
        reply(null, {userid: 'updated user id'});
    }

    function getlist(msg, reply) {
        console.log("user/getlist invoke by " + JSON.stringify(msg));
        reply(null, 'all user list');
    }

    function getone(msg, reply) {
        console.log("user/getone invoke by " + JSON.stringify(msg));
        reply(null, 'one user info');
    }


  }