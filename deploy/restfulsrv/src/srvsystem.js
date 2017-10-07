/**
 * Created by wangxiaoqing on 2017/3/25.
 */

const config = require('./config');
let mongoose = require('mongoose');
let winston = require('./log/log.js');
let DBModels = require('./db/models.js');
const _ = require('lodash');
const schedule = require('node-schedule');
let pwd = require('./util/pwd.js');

let createadmin = ()=>{
  let userModel = mongoose.model('UserAdmin', DBModels.UserAdminSchema);
  userModel.findOne({username: 'admin'}, (err, adminuser)=> {
    if(!err && !adminuser) {
        let passwordsalt = pwd.getsalt();
        pwd.hashPassword('admin',passwordsalt,(err,passwordhash)=>{
          if(!err){
            adminuser = {
              username:'admin',
              passwordsalt,
              passwordhash
            };
            let entity = new userModel(adminuser);
            entity.save((err)=> {
            });
          }
        });
    }
  });
};


// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)


let job=()=>{

    createadmin();
    // schedule.scheduleJob('0 0 * * *', ()=>{
      //每天0点更新优惠券过期信息
    //   setmycouponsexpired();
    // });
    //
    // schedule.scheduleJob('*/5 * * * *', ()=>{
    //   //console.log('每隔5分钟执行这里!');
    //   updatesystemconfig();
    // });
};

exports.job = job;
