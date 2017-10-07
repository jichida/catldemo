const systemconfig = require('../common/systemconfig');
const userlogin = require('../common/userlogin');
const device = require('../common/device.js');
const realtimealarm = require('../common/realtimealarm.js');
const moment = require('moment');
const historytrack = require('../common/historytrack');
//司机端
const actiondatahandler = {

  'getsystemconfig':systemconfig.getsystemconfig,
  'loginwithtoken':userlogin.loginwithtoken,
  'logout':userlogin.logout,
  'login':userlogin.loginuser,

  //正式版本中下面的删除
};

const authhandler = {
  'querydevice':device.querydevice,
  'querydevicegroup':device.querydevicegroup,
  'queryrealtimealarm':realtimealarm.queryrealtimealarm,
  'querydeviceinfo':device.querydeviceinfo,
  'searchbattery':device.searchbattery,
  'queryhistorytrack':historytrack.queryhistorytrack,
  'serverpush_devicegeo_sz':device.serverpush_devicegeo_sz,
  // 'searchbattery_request':
  // 'searchbatteryalarm_request':
  // 'searchbatteryalarmsingle_request':
};

module.exports = (socket,actiondata,ctx)=>{
  console.log("PC端获取数据--->" + JSON.stringify(actiondata));
  console.log("PC端获取上下文--->" + JSON.stringify(ctx));
  console.log(`${actiondata.cmd}接受到时间:${moment().format("YYYY-MM-DD HH:mm:ss")}`);
  try{
      if(ctx.usertype !== 'pc'){
        console.log("不是正确的客户端--->" + actiondata.cmd);
        socket.emit('common_err',{errmsg:'无效的app客户端'});
        return;
      }
      if(!!actiondatahandler[actiondata.cmd]){
        actiondatahandler[actiondata.cmd](actiondata.data,ctx,(result)=>{
        //  console.log("服务端回复--->" + JSON.stringify(result));
          console.log(`${actiondata.cmd}回复时间:${moment().format("YYYY-MM-DD HH:mm:ss")}`);
          socket.emit(result.cmd,result.payload);
        });
      }
      else{
        if(!!authhandler[actiondata.cmd]){
          if(!ctx['userid']){
            console.log("需要登录--->" + actiondata.cmd);
            socket.emit('common_err',{errmsg:'请先重新登录'});
          }
          else{
            authhandler[actiondata.cmd](actiondata.data,ctx,(result)=>{
              // console.log("服务端回复--->" + JSON.stringify(result));
              console.log(`${actiondata.cmd}回复时间:${moment().format("YYYY-MM-DD HH:mm:ss")}`);
              socket.emit(result.cmd,result.payload);
            });
          }
        }
        else{
          console.log("未找到处理函数--->" + actiondata.cmd);
          socket.emit('common_err',{errmsg:`未找到处理函数${actiondata.cmd}`});
        }
      }
    }
    catch(e){
      console.log("服务端内部错误--->" + e);
      socket.emit('common_err',{errmsg:`服务端内部错误:${JSON.stringify(e)}`});
    }
}
