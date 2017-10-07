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

const GET_LIST = 'GET_LIST';
const GET_ONE = 'GET_ONE';
const GET_MANY = 'GET_MANY';
const GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

// let defaultmiddlewareauth = (req,res,next)=>{
//   next();
// };
app.post('/adminapi/adminauth',(req,res)=>{
  let actiondata =   req.body;
  console.log("actiondata=>" + JSON.stringify(actiondata));

  let userModel = DBModels.UserAdminModel;
  userModel.findOne({ username: actiondata.username }, (err, user)=> {
    if (!!err) {
      res.status(200).json({
        loginsuccess:false,
      });
      return;
    }
    if (!user) {
      res.status(200).json({
        loginsuccess:false,
      });
      return;
    }
    pwd.checkPassword(user.passwordhash,user.passwordsalt,actiondata.password,(err,isloginsuccess)=>{
      if(!err && isloginsuccess){
        let token = jwt.sign({
              exp: Math.floor(Date.now() / 1000) +config.loginuserexptime,
              _id:user._id,
              usertype:'admin',
            },config.secretkey, {});
        res.status(200).json({
          loginsuccess:true,
          token:token
        });
      }
      else{
        res.status(200).json({
          loginsuccess:false,
        });
      }
    });
  });
});

for(let keyname in dbs){
    let schmodel = dbs[keyname];
    let urlname = '/adminapi' + schmodel.urlname;
    app.post(urlname,middlewareauth,(req,res)=>{
      let queryparam =   req.body;
      console.log("queryparam=>" + JSON.stringify(queryparam));

      let query = {};
      let sort = {};
      let options = {};
      if(queryparam.params.hasOwnProperty('sort')){
        sort[queryparam.params.sort.field] = queryparam.params.sort.order==="DESC"?-1:1;
        options.sort = sort;
      }
      if(queryparam.params.hasOwnProperty('pagination')){
        options['page'] = queryparam.params.pagination.page;
        if (typeof options['page'] === 'string') {
          options['page'] = parseInt(options['page']);
        }
        options['limit'] = queryparam.params.pagination.perPage;
        if (typeof options['limit'] === 'string') {
          options['limit'] = parseInt(options['limit']);
        }
      }
      if(queryparam.params.hasOwnProperty('filter')){
        let querypre = queryparam.params.filter;
        query = {};
        _.map(querypre,(value,key)=>{
          let keysz = key.split('_');
          if(keysz.length === 2){
            if(keysz[1]=== 'q'){
              query[keysz[0]] = new RegExp(value);
            }
          }
          else{
            query[key] = value;
          }
        });

      }
      console.log("query=>" + JSON.stringify(query));
      console.log("options=>" + JSON.stringify(options));


      if(queryparam.type === GET_LIST){
        let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
        dbModel.paginate(query, options,(err,result)=>{
          console.log("GET_LIST result=>" + JSON.stringify(result));
          res.status(200).json(result);
        });
      }
      else if(queryparam.type === GET_ONE){
        let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
        dbModel.findById(queryparam.params.id,(err,result)=>{
          console.log("GET_ONE result=>" + JSON.stringify(result));
          res.status(200)
              .json(result);
        });
      }
      else if(queryparam.type === GET_MANY){
        //"params":{"ids":["58e71be6ef4e8d02eca6e0e8","58eaecea130f4809a747d2f8"]}}
        //{ data: {Record[]} }
        let ids = queryparam.params.ids;
        let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
        dbModel.find({ _id: { "$in" : ids} },(err,result)=>{
          console.log("GET_MANY result=>" + JSON.stringify(result));
          res.status(200)
              .json(result);
        });
      }
      else if(queryparam.type === GET_MANY_REFERENCE){
        let query = {};
        query[queryparam.params.target] = queryparam.params.id;
        console.log("GET_MANY_REFERENCE 查询条件=>" + JSON.stringify(query));
        let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
        dbModel.find(query,(err,result)=>{
          console.log("GET_MANY_REFERENCE result=>" + JSON.stringify(result));
          res.status(200)
              .json(result);
        });
      }
      else if(queryparam.type === CREATE){
        let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
        let createddata = queryparam.params.data;
        adminaction.preaction('save',schmodel.collectionname,createddata,(err,result)=>{
          if(!err && result){
            let entity = new dbModel(createddata);
            entity.save((err,result)=>{
              console.log("CREATE err=>" + JSON.stringify(err));
              console.log("CREATE result=>" + JSON.stringify(result));
              if(!err){
                res.status(200)
                    .json(result);
                adminaction.postaction('save',schmodel.collectionname,result);
              }
              else{
                res.status(500)
                    .json(err);
              }
            });
          }
        });


      }
      else if(queryparam.type === UPDATE){
        let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
        let updateddata = queryparam.params.data;
        adminaction.preaction('findByIdAndUpdate',schmodel.collectionname,updateddata,(err,result)=>{
          if(!err && result){
            dbModel.findByIdAndUpdate(queryparam.params.id,updateddata, {new: true},(err, result)=> {
                    console.log("UPDATE err=>" + JSON.stringify(err));
                    console.log("UPDATE result=>" + JSON.stringify(result));
                      if(!err){
                        res.status(200)
                            .json(result);
                        adminaction.postaction('findByIdAndUpdate',schmodel.collectionname,result);
                      }
                      else{
                        res.status(500)
                            .json(err);
                      }
                    });
          }
          else{
            res.status(500)
                .json(err);
          }
        });
      }
      else if(queryparam.type === DELETE){
        let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
        dbModel.findOneAndRemove({
              _id: queryparam.params.id
          }, (err, result)=> {
            console.log("DELETE err=>" + JSON.stringify(err));
            console.log("DELETE result=>" + JSON.stringify(result));
            if(!err){
              res.status(200)
                  .json(result);
            }
            else{
              res.status(500)
                  .json(err);
            }
          });
      }
    });
  }
};

module.exports=  startmodule;
