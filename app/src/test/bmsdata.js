import data_bms_mydevice from '../test/bms_mydevice.json';
import data_bms_alarm from '../test/bms_alarm.json';
import data_bms_workorder from '../test/workorder.json';
import jsondatareadonly_device from '../test/bmsdata_device.json';
import jsondatareadonly_chargingpile from '../test/bmsdata_chargingpile.json';
import _ from 'lodash';

import jsondatatrack from '../test/1602010008.json';
import jsondataalarm from '../test/json-BMS2.json';

//获取地理位置信息，封装为promise
let jsondata = _.filter(jsondatareadonly_device,(item) => {
  let thisdata = false;
  if(!!item.LastHistoryTrack){
    if(!!item.LastHistoryTrack.Latitude){
      if(item.LastHistoryTrack.Latitude > 0){
        thisdata = !!item.LastHistoryTrack.Province;
      }
    }
  }
  return thisdata;
});
_.map(jsondata,(item)=>{
    item.imagetype = '0';
});

let gmap_chargingpile = {};
let jsondata_chargingpile = _.filter(jsondatareadonly_chargingpile,(item) => {
  return true;
});
_.map(jsondata_chargingpile,(item,index)=>{
    item.DeviceId = item['充电桩编号'];
    item.LastHistoryTrack = {
      Latitude:item.LastHistoryTrack__Latitude,
      Longitude:item.LastHistoryTrack__Longitude
    }
    let imagetype = 4+index%3;
    item.imagetype = ''+imagetype;
    gmap_chargingpile[item.DeviceId] = item;
});


let jsondatasamle_bms_mydevice = _.sampleSize(jsondata,data_bms_mydevice.length);
let jsondata_bms_mydevice = [];
let jsondata_bms_alarm = [];
let jsondata_bms_workorder =[];


_.map(data_bms_mydevice,(item,index)=>{
  item.DeviceId = jsondatasamle_bms_mydevice[index].DeviceId;
  jsondata_bms_mydevice.push(item);
});
_.map(data_bms_alarm,(item,index)=>{
  item.DeviceId = jsondatasamle_bms_mydevice[index].DeviceId;
  jsondata_bms_alarm.push(item);
});
_.map(data_bms_workorder,(item,index)=>{
  item.DeviceId = jsondatasamle_bms_mydevice[index].DeviceId;
  jsondata_bms_workorder.push(item);
});

export {
  jsondata,
  jsondata_chargingpile,
  jsondatatrack,
  jsondataalarm,
  jsondata_bms_mydevice,
  jsondata_bms_alarm,
  jsondata_bms_workorder,
  gmap_chargingpile
};
