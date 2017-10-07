const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const coordtransform = require('coordtransform');
const _ = require('lodash');
const moment = require('moment');

const getRandomLocation =  (latitude, longitude, radiusInMeters)=>{

    var getRandomCoordinates =  (radius, uniform)=> {
        // Generate two random numbers
        var a = Math.random(),
            b = Math.random();

        // Flip for more uniformity.
        if (uniform) {
            if (b < a) {
                var c = b;
                b = a;
                a = c;
            }
        }

        // It's all triangles.
        return [
            b * radius * Math.cos(2 * Math.PI * a / b),
            b * radius * Math.sin(2 * Math.PI * a / b)
        ];
    };

    var randomCoordinates = getRandomCoordinates(radiusInMeters, true);

    // Earths radius in meters via WGS 84 model.
    var earth = 6378137;

    // Offsets in meters.
    var northOffset = randomCoordinates[0],
        eastOffset = randomCoordinates[1];

    // Offset coordinates in radians.
    var offsetLatitude = northOffset / earth,
        offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (latitude / 180)));

    // Offset position in decimal degrees.
    let result = {
        latitude: latitude + (offsetLatitude * (180 / Math.PI)),
        longitude: longitude + (offsetLongitude * (180 / Math.PI))
    }
    return [result.longitude,result.latitude];
};


exports.querydevicegroup= (actiondata,ctx,callback)=>{
  let devicegroupModel = DBModels.DeviceGroupModel;
  let query = actiondata.query || {};
  let fields = actiondata.fields || {'DeviceId':1,'LastHistoryTrack.Latitude':1,'LastHistoryTrack.Longitude':1};

  console.log(`fields-->${JSON.stringify(fields)}`);
  let queryexec = devicegroupModel.find(query).select(fields);
  queryexec.exec((err,list)=>{
    if(!err){
      if(list.length > 0){
        console.log(`-->${JSON.stringify(list[0])}`);
      }
      //for test only
      callback({
        cmd:'querydevicegroup_result',
        payload:{list:[]}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'querydevicegroup'}
      });
    }
  });
}

exports.querydevice = (actiondata,ctx,callback)=>{
  let deviceModel = DBModels.DeviceModel;
  let query = actiondata.query || {};
  let fields = actiondata.fields || {
    'DeviceId':1,
    'LastHistoryTrack.Latitude':1,
    'LastHistoryTrack.Longitude':1,
  };
  console.log(`fields-->${JSON.stringify(fields)}`);
  let queryexec = deviceModel.find(query).select(fields);
  queryexec.exec((err,list)=>{
    if(!err){
      if(list.length > 0){
        console.log(`-->${JSON.stringify(list[0])}`);
      }
      callback({
        cmd:'querydevice_result',
        payload:{list}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'querydevice'}
      });
    }
  });
}

exports.querydeviceinfo =  (actiondata,ctx,callback)=>{
  let deviceModel = DBModels.DeviceModel;
  let query = actiondata.query || {};
  let fields = actiondata.fields || {};
  console.log(`fields-->${JSON.stringify(fields)}`);
  let queryexec = deviceModel.findOne(query).select(fields);
  queryexec.exec((err,result)=>{
    if(!err && !!result){
      callback({
        cmd:'querydeviceinfo_result',
        payload:result
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'querydeviceinfo'}
      });
    }
  });
}

//获取的是设备完整信息
exports.searchbattery = (actiondata,ctx,callback)=>{
  let deviceModel = DBModels.DeviceModel;
  let query = actiondata.query || {};
  let fields = actiondata.fields || {
    'DeviceId':1,
    'LastHistoryTrack.Latitude':1,
    'LastHistoryTrack.Longitude':1,
  };

  deviceModel.aggregate({$sample: {size: 50}}).exec((err,list)=>{
    if(!err){
      if(list.length > 0){
        console.log(`-->${JSON.stringify(list[0])}`);
      }
      callback({
        cmd:'searchbattery_result',
        payload:{list}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'searchbattery_result'}
      });
    }
  });

  //<-----处理query条件
  // let r = Math.random()*10000;
  // query = {};
  // console.log(`fields-->${JSON.stringify(fields)}`);
  // let queryexec = deviceModel.find(query).select(fields).limit(50).skip(r);
  // queryexec.exec((err,list)=>{
  //   if(!err){
  //     if(list.length > 0){
  //       console.log(`-->${JSON.stringify(list[0])}`);
  //     }
  //     callback({
  //       cmd:'searchbattery_result',
  //       payload:{list}
  //     });
  //   }
  //   else{
  //     callback({
  //       cmd:'common_err',
  //       payload:{errmsg:err.message,type:'searchbattery_result'}
  //     });
  //   }
  // });
}

//模拟动态数据
exports.serverpush_devicegeo_sz  = (actiondata,ctx,callback)=>{
  let deviceModel = DBModels.DeviceModel;
  let query = actiondata.query || {};
  let fields = actiondata.fields || {
    'DeviceId':1,
    'LastHistoryTrack.Latitude':1,
    'LastHistoryTrack.Longitude':1,
  };

  deviceModel.aggregate([
    {
      $match: {
        'LastHistoryTrack':{$exists : true},
      }
    },
    {
      $sample: {size: 5000}
    },
    {
      "$project": {
        'DeviceId':1,
        'LastHistoryTrack.Latitude':1,
        'LastHistoryTrack.Longitude':1,
      }
    },]
  ).exec((err,list)=>{
    if(!err){
      let items = [];
      for(let i = 0;i < list.length; i++){
        let item = list[i];
        if(!!item.LastHistoryTrack){
          if(item.LastHistoryTrack.Latitude !== 0){
            let locationsz = getRandomLocation(item.LastHistoryTrack.Latitude,item.LastHistoryTrack.Longitude,10*1000);
            item.LastHistoryTrack.Latitude = locationsz[1];
            item.LastHistoryTrack.Longitude  =  locationsz[0];
            let cor = [item.LastHistoryTrack.Longitude,item.LastHistoryTrack.Latitude];
            const wgs84togcj02=coordtransform.wgs84togcj02(cor[0],cor[1]);
            item.locz = wgs84togcj02;
            items.push({
              'DeviceId':item.DeviceId,
              'LastHistoryTrack':{
                Latitude:item.LastHistoryTrack.Latitude,
                Longitude:item.LastHistoryTrack.Longitude,
              },
              'locz':wgs84togcj02,
            });
          }
        }
      };

      if(list.length > 0){
        console.log(`-->${JSON.stringify(list[0])},变化个数==>${items.length}`);
      }
      callback({
        cmd:'serverpush_devicegeo_sz_result',
        payload:{list:items}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'serverpush_devicegeo_sz_result'}
      });
    }
  });
};

//保存设备数据
exports.savedevice = (actiondata,ctx,callback)=>{
  actiondata.updated_at = new Date();
  let curdatatime = moment().format('YYYY-MM-DD HH:mm:ss');
  try{
     curdatatime = moment(actiondata.TPData.DataTime).format('YYYY-MM-DD HH:mm:ss');
  }
  catch(e){
    console.log(`e==>${JSON.stringify(e)}`);
  }
  actiondata.TPData.DataTime = curdatatime;
  console.log(`savedevice==>${JSON.stringify(actiondata)}`);

  const deviceModel = DBModels.DeviceModel;
  deviceModel.findOneAndUpdate({
      DeviceId: actiondata.DeviceId,
  },{$set:actiondata}, {new: true, upsert: true}, (err, updateditem)=> {
    console.log(`deviceModel=>err:${JSON.stringify(err)},updateditem:${JSON.stringify(updateditem)}`);
    callback(err,updateditem);
  });

  actiondata.LastHistoryTrack.GPSTime = curdatatime;
  actiondata.LastHistoryTrack.DeviceId = actiondata.DeviceId;
  //插入历史记录
  const historyTrackModel = DBModels.HistoryTrackModel;
  historyTrackModel.findOneAndUpdate({
      DeviceId: actiondata.DeviceId,
      GPSTime:curdatatime
  },{$set:actiondata.LastHistoryTrack}, {new: true, upsert: true}, (err, updateditem)=> {
    console.log(`historyTrackModel=>err:${JSON.stringify(err)},updateditem:${JSON.stringify(updateditem)}`);
    callback(err,updateditem);
  });
};
