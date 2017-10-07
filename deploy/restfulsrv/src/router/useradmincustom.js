let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
const config = require('../config.js');
const _  = require('lodash');
const jwt = require('jsonwebtoken');
const moment  = require('moment');
let dbs = require('../db/index.js');
let middlewareauth = require('./middlewareauth.js');
const adminaction = require('../db/adminaction.js');
const pwd = require('../util/pwd.js');

let startmodule = (app)=>{
  app.post('/adminapi/resetuserpassword',middlewareauth,(req,res)=>{
    let actiondata =   req.body;
    console.log("actiondata=>" + JSON.stringify(actiondata));
    if(typeof actiondata.userid === "string"){
       actiondata.userid = mongoose.Types.ObjectId(actiondata.userid);
    }
    let userModel = DBModels.UserModel;
    userModel.findOne({ _id: actiondata.userid }, (err, user)=> {
      if (!!err) {
        res.status(200).json({
          result:false,
          msg:'内部错误'
        });
        return;
      }
      if (!user) {
        res.status(200).json({
          result:false,
          msg:'找不到用户'
        });
        return;
      }
      let passwordsalt = pwd.getsalt();
      pwd.hashPassword(actiondata.password,passwordsalt,(err,passwordhash)=>{
        let retdoc = {
          passwordsalt:passwordsalt,
          passwordhash:passwordhash
        };

        userModel.findByIdAndUpdate(user._id,{$set:retdoc},(err,result)=>{
          res.status(200).json({
            result:true,
            msg:'修改密码成功'
          });
        });
      });
    });
  });

};

module.exports=  startmodule;
