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
        reply(null, {userid: 'new user id'});
    }

    function remove(msg, reply) {
        console.log("user/remove invoke by " + JSON.stringify(msg));
        reply(null, {userid: 'removed user id'});
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