import data_bms_mydevice from '../test/bms_mydevice.json';
import data_bms_alarm from '../test/bms_alarm.json';
import data_bms_workorder from '../test/workorder.json';
import jsondatareadonly_device from '../test/bmsdata_device.json';
import jsondatareadonly_chargingpile from '../test/bmsdata_chargingpile.json';
import _ from 'lodash';

import jsondatatrack from '../test/1602010008.json';
import jsondataalarm from '../test/json-BMS2.json';
import data_bms_Charging_pile from '../test/Charging_pile.json';
//获取地理位置信息，封装为promise
let jsondata = _.filter(jsondatareadonly_device,(item) => {
  let thisdata = false;
  if(!!item.LastHistoryTrack){
    if(!!item.LastHistoryTrack.Latitude){
      if(item.LastHistoryTrack.Latitude > 0){
        thisdata = true;
      }
    }
  }
  return thisdata;
});
_.map(jsondata,(item)=>{
    item.imagetype = '0';
});


let jsondata_result = _.filter(jsondatareadonly_chargingpile,(item) => {
  let thisdata = false;
  if(!!item.LastHistoryTrack){
    if(!!item.LastHistoryTrack.Latitude){
      if(item.LastHistoryTrack.Latitude > 0){
        thisdata = true;
      }
    }
  }
  return thisdata;
});
_.map(jsondata_result,(item)=>{
    item.imagetype = '4';
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

let jsondata_charging_pile = [];
_.map(data_bms_Charging_pile,(item,data)=>{
  if( typeof(item.LastHistoryTrack__Latitude) === 'string'){
    item.LastHistoryTrack__Latitude = parseFloat(item.LastHistoryTrack__Latitude);
  }
  if( typeof(item.LastHistoryTrack__Longitude) === 'string'){
    item.LastHistoryTrack__Longitude  = parseFloat(item.LastHistoryTrack__Longitude);
  }

  ////[116.396574, 39.992706];//地图上所标点的坐标
  item.locz = [item.LastHistoryTrack__Longitude,item.LastHistoryTrack__Latitude];
  jsondata_charging_pile.push(item);
});

console.log(`jsondata_charging_pile==>`);
console.log(`${JSON.stringify(jsondata_charging_pile)}`);
export {jsondata,jsondata_result,jsondatatrack,jsondataalarm,jsondata_bms_mydevice,jsondata_bms_alarm,jsondata_bms_workorder,jsondata_charging_pile};
